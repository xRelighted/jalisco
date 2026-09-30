import type { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";

type Props = {
  home: ReactNode;
  menu: ReactNode;
  reservations: ReactNode;
  notFound: ReactNode;
};

export default function RouteTree({ home, menu, reservations, notFound }: Props) {
  return <Routes>
    <Route element={<SiteLayout />}>
      <Route index element={home} />
      <Route path="menu" element={menu} />
      <Route path="reservas" element={reservations} />
      <Route path="*" element={notFound} />
    </Route>
  </Routes>;
}
