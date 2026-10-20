import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
