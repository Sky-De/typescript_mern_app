import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.scss";

type RouteType = {
  path: string;
  label: string;
};

const routes: RouteType[] = [
  { path: "/", label: "Home" },
  { path: "/profile", label: "Profile" },
  { path: "/about", label: "About" },
  { path: "/chess", label: "Chess" },
  { path: "/profile/setting", label: "Setting" },
  // Add other routes if added any later
];

const Nav: React.FC = () => {
  const { pathname } = useLocation();

  const [activeRoutes, setActiveRoutes] = useState<RouteType[]>([]);

  useEffect(() => {
    // Finds the active routes based on the current pathname
    const activeRoutes = routes.filter((route) =>
      pathname.startsWith(route.path)
    );

    setActiveRoutes(activeRoutes);
  }, [pathname]);

  return (
    <nav className="nav">
      {activeRoutes.map((route, index) => (
        <React.Fragment key={route.path}>
          <Link
            className={`nav__link ${route.path === pathname ? "active" : ""}`}
            to={route.path}
          >
            {route.label}
          </Link>
          {index < activeRoutes.length - 1 && <span> / </span>}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Nav;
