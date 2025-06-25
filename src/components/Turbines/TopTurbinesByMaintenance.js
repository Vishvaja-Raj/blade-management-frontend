import React, { useEffect, useState } from "react";
import axios from "axios";

const TopTurbinesByMaintenance = () => {
  const [topTurbines, setTopTurbines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bladesRes, maintRes, turbinesRes] = await Promise.all([
          axios.get("http://localhost:8000/blades"),
          axios.get("http://localhost:8000/maintenance"),
          axios.get("http://localhost:8000/turbines")
        ]);

        const bladeMap = Object.fromEntries(bladesRes.data.map(b => [b.blade_id, b.turbine_id]));
        const turbineMap = Object.fromEntries(turbinesRes.data.map(t => [t.turbine_id, t.model]));

        const count = {};
        maintRes.data.forEach(m => {
          const turbineId = bladeMap[m.blade_id];
          if (turbineId) {
            count[turbineId] = (count[turbineId] || 0) + 1;
          }
        });

        const sorted = Object.entries(count)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([turbine_id, total]) => ({
            turbine_id,
            model: turbineMap[turbine_id] || "Unknown",
            total
          }));

        setTopTurbines(sorted);
      } catch (err) {
        console.error("Failed to load top turbines by maintenance", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl">
        <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Top 5 Turbines by Maintenance
        </h3>
        <ul className="space-y-3">
          {topTurbines.map((turbine) => (
            <li
              key={turbine.turbine_id}
              className="flex justify-between px-5 py-3 rounded-lg bg-gray-100 text-gray-800 shadow-sm"
            >
              <span className="font-medium">{turbine.turbine_id} ({turbine.model})</span>
              <span className="font-bold">{turbine.total}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopTurbinesByMaintenance;
