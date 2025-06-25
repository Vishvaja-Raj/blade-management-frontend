// components/TopSitesByMaintenance.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const TopSitesByMaintenance = () => {
  const [topSites, setTopSites] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/sites/top_sites_by_maintenance")
      .then((res) => setTopSites(res.data))
      .catch((err) =>
        console.error("Failed to load top sites by maintenance:", err)
      );
  }, []);

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-bold mb-4">Top 5 Sites with the Most Maintenance Activities</h3>
      <ul className="space-y-2">
        {topSites.map((site) => (
          <li
            key={site.site_id}
            className="flex justify-between border-b pb-2 text-gray-700"
          >
            <span>{site.name}</span>
            <span className="font-semibold">{site.total} records</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSitesByMaintenance;
