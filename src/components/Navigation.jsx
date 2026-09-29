import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Situation Map", end: true },
  { to: "/site-analysis", label: "Site Analysis" },
  { to: "/site-history", label: "Site History" },
  { to: "/register", label: "Thermal Source Register" },
  { to: "/alerts", label: "Alerts" },
  { to: "/exercise", label: "Exercise" },
  { to: "/data-method", label: "Data & Method" },
];

export default function Navigation() {
  return (
    <nav className="app-nav">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => "app-nav__link" + (isActive ? " active" : "")}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
