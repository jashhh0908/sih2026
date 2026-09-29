import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Navigation from "./Navigation.jsx";
import PrototypeBanner from "./PrototypeBanner.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <Navigation />
      <PrototypeBanner />
      <main className="app-main">
        <div className="app-main__content">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
