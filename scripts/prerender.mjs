import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const output = path.join(root, "dist/public");
const templatePath = path.join(output, "index.html");
const template = await fs.readFile(templatePath, "utf8");
const serverModulePath = path.join(root, "dist/server/entry-server.js");
const { render, metadataForPath, photos, siteUrl } = await import(pathToFileURL(serverModulePath).href);

const routes = [
  { path: "/", file: "index.html", hero: photos[0] },
  { path: "/menu", file: "menu.html", hero: photos[1] },
  { path: "/reservas", file: "reservas.html", hero: null },
];

function escapeAttribute(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function setMeta(html, selector, content) {
  const separator = selector.indexOf(":");
  const attribute = selector.slice(0, separator);
  const key = selector.slice(separator + 1);
  const tagPattern = new RegExp(`<meta(?=[^>]*\\b${attribute}="${key}")[^>]*>`);
  const tag = html.match(tagPattern)?.[0];
  if (!tag) throw new Error(`Missing metadata tag ${selector}`);
  const replacement = tag.replace(/\bcontent="[^"]*"/, `content="${escapeAttribute(content)}"`);
  return html.replace(tag, replacement);
}

function setCanonical(html, url) {
  const tag = html.match(/<link rel="canonical" href="[^"]*"\s*\/>/)?.[0];
  if (!tag) throw new Error("Missing canonical link in build template");
  return html.replace(tag, `<link rel="canonical" href="${escapeAttribute(url)}" />`);
}

function setHeroPreload(html, photo) {
  const tag = html.match(/<link rel="preload"(?=[^>]*\bas="image")[^>]*>/)?.[0];
  if (!tag) throw new Error("Missing image preload in Vite template");
  if (!photo) return html.replace(tag, "");
  const source = escapeAttribute(photo.avifSet);
  const href = escapeAttribute(photo.avifSet.split(",").at(-1).trim().replace(/\s+\d+w$/, ""));
  const replacement = `<link rel="preload" href="${href}" imagesrcset="${source}" imagesizes="100vw" as="image" type="image/avif" fetchpriority="high" />`;
  return html.replace(tag, replacement);
}

for (const route of routes) {
  const metadata = metadataForPath(route.path);
  let html = template;
  const rootElement = '<div id="root"></div>';
  if (!html.includes(rootElement)) throw new Error("Missing #root placeholder in Vite template");
  html = html.replace(rootElement, `<div id="root">${render(route.path)}</div>`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttribute(metadata.title)}</title>`);
  html = setMeta(html, "name:description", metadata.description);
  html = setMeta(html, "property:og:title", metadata.title);
  html = setMeta(html, "property:og:description", metadata.description);
  html = setMeta(html, "property:og:image", metadata.image);
  html = setMeta(html, "property:og:url", `${siteUrl}${route.path}`);
  html = setMeta(html, "name:twitter:title", metadata.title);
  html = setMeta(html, "name:twitter:description", metadata.description);
  html = setMeta(html, "name:twitter:image", metadata.image);
  html = setCanonical(html, `${siteUrl}${route.path}`);
  html = setHeroPreload(html, route.hero);
  await fs.writeFile(path.join(output, route.file), html);
  console.log(`Prerendered ${route.path} → dist/public/${route.file} (${Buffer.byteLength(html)} bytes)`);
}

const notFoundMetadata = metadataForPath("/404");
let notFoundHtml = template;
const rootElement = '<div id="root"></div>';
if (!notFoundHtml.includes(rootElement)) throw new Error("Missing #root placeholder in Vite template");
notFoundHtml = notFoundHtml.replace(rootElement, `<div id="root">${render("/ruta-no-encontrada")}</div>`);
notFoundHtml = notFoundHtml.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttribute(notFoundMetadata.title)}</title>`);
notFoundHtml = setMeta(notFoundHtml, "name:description", notFoundMetadata.description);
notFoundHtml = setMeta(notFoundHtml, "name:robots", "noindex,nofollow");
notFoundHtml = setMeta(notFoundHtml, "property:og:title", notFoundMetadata.title);
notFoundHtml = setMeta(notFoundHtml, "property:og:description", notFoundMetadata.description);
notFoundHtml = setMeta(notFoundHtml, "property:og:image", notFoundMetadata.image);
notFoundHtml = setMeta(notFoundHtml, "property:og:url", `${siteUrl}/404`);
notFoundHtml = setMeta(notFoundHtml, "name:twitter:title", notFoundMetadata.title);
notFoundHtml = setMeta(notFoundHtml, "name:twitter:description", notFoundMetadata.description);
notFoundHtml = setMeta(notFoundHtml, "name:twitter:image", notFoundMetadata.image);
notFoundHtml = setCanonical(notFoundHtml, `${siteUrl}/404`);
notFoundHtml = setHeroPreload(notFoundHtml, null);
await fs.writeFile(path.join(output, "404.html"), notFoundHtml);
console.log(`Prerendered 404 → dist/public/404.html (${Buffer.byteLength(notFoundHtml)} bytes)`);
