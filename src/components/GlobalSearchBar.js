import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GlobalSearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) return setResults([]);

    const fetchData = async () => {
      const [sites, turbines, blades, maintenance] = await Promise.all([
        axios.get("http://localhost:8000/sites"),
        axios.get("http://localhost:8000/turbines"),
        axios.get("http://localhost:8000/blades"),
        axios.get("http://localhost:8000/maintenance"),
      ]);

      const all = [
        ...sites.data.map((s) => ({ type: "Site", id: s.site_id, label: s.name })),
        ...turbines.data.map((t) => ({ type: "Turbine", id: t.turbine_id, label: t.model })),
        ...blades.data.map((b) => ({ type: "Blade", id: b.blade_id, label: b.type })),
        ...maintenance.data.map((m) => ({
          type: "Maintenance",
          id: m.maintenance_id,
          label: m.issue,
        })),
      ];

      const filtered = all.filter((item) =>
        `${item.label} ${item.id} ${item.type}`.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filtered);
    };

    fetchData();
  }, [query]);

  const handleSelect = (item) => {
    switch (item.type) {
      case "Site":
        navigate(`/turbines?site_id=${item.id}`);
        break;
      case "Turbine":
        navigate(`/blades?turbine_id=${item.id}`);
        break;
      case "Blade":
        navigate(`/maintenance?blade_id=${item.id}`);
        break;
      case "Maintenance":
        navigate(`/maintenance?maintenance_id=${item.id}`);
        break;
      default:
        break;
    }

    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-1 mb-18">
      <div className="relative">
        <input
          type="text"
          placeholder="Search Site, Turbine, Blade or Maintenance..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4  py-3 text-lg border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {/* Search Icon (you can replace this <svg> with your PNG inside <img />) */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>
        </div>
      </div>

      {results.length > 0 && (
        <ul className="absolute z-50 bg-white border border-gray-200 w-full rounded-xl mt-2 shadow-lg max-h-72 overflow-y-auto">
          {results.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm flex justify-between"
            >
              <span>
                <strong className="text-blue-700">{item.type}</strong>: {item.label}
              </span>
              <span className="text-gray-400">#{item.id}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GlobalSearchBar;
