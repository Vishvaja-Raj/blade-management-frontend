import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Sites", path: "/sites" },
    { name: "Turbines", path: "/turbines" },
    { name: "Blades", path: "/blades" },
    { name: "Maintenance", path: "/maintenance" },
  ];

  return (
    <div className="w-60 h-full bg-white border-r shadow-sm">
      <div className="text-2xl font-bold p-6 border-b">BladeManager</div>
      <ul className="p-4 space-y-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`block p-2 rounded ${
                location.pathname === item.path
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
