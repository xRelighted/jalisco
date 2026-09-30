import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:4173";
const chromePath = process.env.CHROME_BIN ?? "/usr/bin/chromium";
const widths = (process.env.QA_WIDTHS ?? "360,375,390,414,768,1024,1280,1440,1920").split(",").map(Number);
const routes = (process.env.QA_ROUTES ?? "/,/menu,/reservas").split(",");
const profile = await fs.mkdtemp(path.join(os.tmpdir(), "jalisco-chrome-"));
const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--disable-background-networking",
    "--disable-extensions",
    "--no-first-run",
    "--no-default-browser-check",
    "--remote-debugging-port=0",
    `--user-data-dir=${profile}`,
    "about:blank",
  ],
  { stdio: "ignore", detached: true },
);

let socket;
let sequence = 0;
const pending = new Map();
const browserErrors = [];
const environmentWarnings = [];
const results = [];

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    socket = new WebSocket(wsUrl);
    socket.addEventListener("open", () => resolve(socket), { once: true });
    socket.addEventListener("error", reject, { once: true });
    socket.addEventListener("message", ({ data }) => {
      const message = JSON.parse(data);
      if (message.method === "Runtime.exceptionThrown") {
        const exception = message.params.exceptionDetails?.exception?.description ?? message.params.exceptionDetails?.text;
        browserErrors.push(exception || "Runtime exception");
      }
      if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
        browserErrors.push(message.params.args?.map((arg) => arg.value ?? arg.description ?? "").join(" ") || "console.error");
      }
      if (message.method === "Log.entryAdded" && message.params.entry.level === "error") {
        const entry = message.params.entry;
        const error = `${entry.url ? `${entry.url}: ` : ""}${entry.text}`;
        if (entry.url?.includes("/_vercel/insights/script.js")) environmentWarnings.push(error);
        else browserErrors.push(error);
      }
      if (message.id && pending.has(message.id)) {
        const { resolve, reject } = pending.get(message.id);
        pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result);
      }
    });
  });
}

function cdp(method, params = {}) {
  const id = ++sequence;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        reject(new Error(`CDP timed out: ${method}`));
      }
    }, 15000).unref?.();
  });
}

async function evaluate(expression, awaitPromise = false) {
  const result = await cdp("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text);
  }
  return result.result?.value;
}

async function waitForPage() {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    const state = await evaluate(`(() => ({
      hasMain: Boolean(document.querySelector('main')),
      hasPlaceholder: Boolean(document.querySelector('.page-loading')),
      readyState: document.readyState,
      url: location.href,
    }))()`);
    if (state.hasMain && !state.hasPlaceholder) {
      await new Promise((resolve) => setTimeout(resolve, 550));
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  const state = await evaluate(`(() => ({ hasMain: Boolean(document.querySelector('main')), hasPlaceholder: Boolean(document.querySelector('.page-loading')), readyState: document.readyState, url: location.href }))()`);
  throw new Error(`Timed out waiting for route render: ${JSON.stringify(state)}`);
}

try {
  const activeFile = path.join(profile, "DevToolsActivePort");
  const deadline = Date.now() + 15000;
  let port;
  while (Date.now() < deadline) {
    try {
      port = Number((await fs.readFile(activeFile, "utf8")).split("\n")[0]);
      if (port) break;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  if (!port) throw new Error("Chromium DevTools endpoint did not start");

  const newTarget = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" }).then((r) => r.json());
  await connect(newTarget.webSocketDebuggerUrl);
  await cdp("Page.enable");
  await cdp("Runtime.enable");
  await cdp("Log.enable");

  for (const width of widths) {
    await cdp("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: width < 700,
    });
    for (const route of routes) {
      const errorStart = browserErrors.length;
      await cdp("Page.navigate", { url: new URL(route, baseUrl).toString() });
      await waitForPage();
      const result = await evaluate(`(() => {
        const text = document.body.innerText;
        const nav = document.querySelector('.mobile-action-bar');
        const map = document.querySelector('.map-frame');
        const ctaCount = [...document.querySelectorAll('.location-card a')].filter(a => a.textContent.trim() === 'Cómo llegar').length;
        return {
          width: innerWidth,
          viewport: innerWidth,
          clientWidth: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
          h1: document.querySelectorAll('main h1').length,
          status: (text.match(/(?:Abierto ahora|Cerrado ahora)/g) || []).length,
          mobileBar: nav ? getComputedStyle(nav).display !== 'none' : false,
          fixedBodyPadding: parseFloat(getComputedStyle(document.body).paddingBottom) > 0,
          directions: ctaCount,
          mapPresent: Boolean(map),
          heading: document.querySelector('main h1')?.innerText || '',
          noPlaceholderLinks: ![...document.querySelectorAll('a')].some(a => a.getAttribute('href') === '#'),
        };
      })()`);
      const problems = [];
      if (result.viewport !== width || result.document > width + 1 || result.body > width + 1) problems.push("horizontal overflow");
      if (result.h1 !== 1) problems.push(`expected one H1, got ${result.h1}`);
      if (result.status > 1) problems.push(`duplicate open status: ${result.status}`);
      if (result.mobileBar !== (width < 700)) problems.push("mobile action bar visibility");
      if (!result.noPlaceholderLinks) problems.push("placeholder anchor");
      if (["/", "/reservas"].includes(route) && result.directions !== 1) problems.push(`expected one directions link, got ${result.directions}`);
      const newErrors = browserErrors.slice(errorStart);
      if (newErrors.length) problems.push(`browser errors: ${newErrors.join(" | ")}`);
      const check = { route, width, pass: problems.length === 0, problems, ...result };
      results.push(check);
      console.log(`${check.pass ? "PASS" : "FAIL"} ${route} ${width}px${problems.length ? ` — ${problems.join("; ")}` : ""}`);
    }
  }

  // Menu content integrity: 11 categories and three distinct images per category.
  await cdp("Page.navigate", { url: new URL("/menu", baseUrl).toString() });
  await waitForPage();
  const menuImages = await evaluate(`(() => [...document.querySelectorAll('.menu-page__category')].map(section => ({
    name: section.querySelector('h3')?.innerText,
    images: [...section.querySelectorAll('.menu-page__gallery-item img')].map(img => img.getAttribute('src')),
  })))()`);
  const menuValid = menuImages.length === 11 && menuImages.every((category) => category.images.length === 3 && new Set(category.images).size === 3);
  const orderLinkCount = await evaluate("document.querySelectorAll('.menu-page__order').length");
  console.log(`${menuValid ? "PASS" : "FAIL"} menu media: ${menuImages.length} categories, ${menuImages.reduce((sum, item) => sum + item.images.length, 0)} images, 3 unique per category`);
  console.log(`${orderLinkCount === 66 ? "PASS" : "FAIL"} menu actions: ${orderLinkCount}/66 direct dish order links`);

  // Check the actual embedded map fills its box when activated near the viewport.
  const mapChecks = [];
  for (const route of ["/", "/reservas"]) {
    await cdp("Page.navigate", { url: new URL(route, baseUrl).toString() });
    await waitForPage();
    await evaluate("document.querySelector('.map-frame')?.scrollIntoView({block:'center'})");
    const deadlineMap = Date.now() + 10000;
    let mapState;
    while (Date.now() < deadlineMap) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      mapState = await evaluate(`(() => {
        const box = document.querySelector('.map-frame');
        const frame = box?.querySelector('iframe');
        if (!box || !frame) return null;
        const a = box.getBoundingClientRect(), b = frame.getBoundingClientRect();
        const style = getComputedStyle(box);
        return {
          title: frame.title,
          src: frame.src,
          widthDiff: Math.abs(frame.getBoundingClientRect().width-box.clientWidth),
          heightDiff: Math.abs(frame.getBoundingClientRect().height-box.clientHeight),
          xDiff: Math.abs(frame.getBoundingClientRect().left-a.left-parseFloat(style.borderLeftWidth)),
          yDiff: Math.abs(frame.getBoundingClientRect().top-a.top-parseFloat(style.borderTopWidth)),
        };
      })()`);
      if (mapState) break;
    }
    const pass = Boolean(mapState && mapState.title.includes("Paseo Deltoto") && mapState.src.includes("Paseo%20Deltoto") && Math.max(mapState.widthDiff, mapState.heightDiff, mapState.xDiff, mapState.yDiff) < 1);
    mapChecks.push({ route, pass, ...mapState });
    console.log(`${pass ? "PASS" : "FAIL"} ${route} map iframe fills container${mapState ? "" : " — iframe never activated"}`);
  }

  const summary = {
    baseUrl,
    date: new Date().toISOString(),
    viewportWidths: widths,
    routes,
    layoutCases: results.length,
    layoutFailures: results.filter((item) => !item.pass),
    menuImages: { categoryCount: menuImages.length, total: menuImages.reduce((sum, item) => sum + item.images.length, 0), uniqueThreePerCategory: menuValid },
    directDishOrderLinks: orderLinkCount,
    mapChecks,
    browserErrors,
    environmentWarnings,
  };
  await fs.mkdir("reports", { recursive: true });
  await fs.writeFile("reports/qa-responsive.json", `${JSON.stringify(summary, null, 2)}\n`);
  const passed = results.every((item) => item.pass) && menuValid && orderLinkCount === 66 && mapChecks.every((item) => item.pass) && browserErrors.length === 0;
  console.log(`\n${passed ? "ACCEPTED" : "NEEDS FIXES"}: ${results.filter((item) => item.pass).length}/${results.length} layout cases, menu media ${menuValid ? "OK" : "FAIL"}, maps ${mapChecks.filter((item) => item.pass).length}/${mapChecks.length}, browser exceptions ${browserErrors.length}`);
  if (!passed) process.exitCode = 1;
} finally {
  try { socket?.close(); } catch {}
  try { process.kill(-chrome.pid, "SIGTERM"); } catch {}
  await new Promise((resolve) => {
    if (chrome.exitCode !== null) return resolve();
    const timeout = setTimeout(resolve, 2500);
    chrome.once("exit", () => { clearTimeout(timeout); resolve(); });
  });
  try { process.kill(-chrome.pid, "SIGKILL"); } catch {}
  await fs.rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
