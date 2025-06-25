// components/SiteSummary.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const SiteSummary = () => {
  const [summary, setSummary] = useState({
    totalSites: 0,
    totalTurbines: 0,
    totalBlades: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [sites, turbines, blades] = await Promise.all([
          axios.get("http://localhost:8000/sites"),
          axios.get("http://localhost:8000/turbines"),
          axios.get("http://localhost:8000/blades"),
        ]);

        setSummary({
          totalSites: sites.data.length,
          totalTurbines: turbines.data.length,
          totalBlades: blades.data.length,
        });
      } catch (err) {
        console.error("❌ Failed to load site summary:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-blue-100 p-4 rounded-xl shadow text-center text-blue-800">
        <h2 className="text-2xl font-bold">{summary.totalSites}</h2>
        <p>Total Sites</p>
      </div>
      <div className="bg-green-100 p-4 rounded-xl shadow text-center text-green-800">
        <h2 className="text-2xl font-bold">{summary.totalTurbines}</h2>
        <p>Total Turbines</p>
      </div>
      <div className="bg-indigo-100 p-4 rounded-xl shadow text-center text-indigo-800">
        <h2 className="text-2xl font-bold">{summary.totalBlades}</h2>
        <p>Total Blades</p>
      </div>
    </div>
  );
};

export default SiteSummary;
