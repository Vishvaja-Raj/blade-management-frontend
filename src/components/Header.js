import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Technicians", path: "/technicians" },
  { name: "Sites", path: "/sites" },
  { name: "Turbines", path: "/turbines" },
  { name: "Blades", path: "/blades" },
  { name: "Maintenance", path: "/maintenance" },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className="w-full bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Blade Management Dashboard
        </h1>
        <nav className="flex gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium px-3 py-1 rounded ${
                location.pathname === item.path
                  ? "text-blue-700 bg-blue-100"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="text-sm text-gray-600">Welcome, Admin</div>
    </header>
  );
};

export default Header;
