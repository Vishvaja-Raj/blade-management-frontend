import React, { useEffect, useState } from "react";
import axios from "axios";
import ListHeader from "../components/ListHeader";
import { useNavigate, useLocation } from "react-router-dom";
import TurbineSummary from "../components/Turbines/TurbineSummary";
import TopTurbinesByMaintenance from "../components/Turbines/TopTurbinesByMaintenance";
import Loader from "../components/Loader"; // Import loader

const Turbines = () => {
  const [turbines, setTurbines] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("turbine_id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const siteIdFilter = query.get("site_id");
const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/turbines")
      .then((res) => setTurbines(res.data))
      .catch((err) => console.error("Failed to load turbines:", err))
      .finally(() => setLoading(false)); // Set loading to false when done
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortBy, sortOrder]);

  const filtered = turbines
    .filter((t) =>
      (!siteIdFilter || t.site_id === siteIdFilter) &&
      [t.turbine_id, t.model, t.site_id].some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      const aVal = a[sortBy]?.toLowerCase?.() || a[sortBy];
      const bVal = b[sortBy]?.toLowerCase?.() || b[sortBy];
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / recordsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleCardClick = (turbineId) => {
    navigate(`/blades?turbine_id=${turbineId}`);
  };
const getTurbineSummary = (turbines) => {
  const summary = {};
  turbines.forEach((t) => {
    const model = t.model || 'Unknown';
    summary[model] = (summary[model] || 0) + 1;
  });
  return summary;
};

  return (
    <div className="space-y-6">
      {loading ? (
      <Loader />
    ) : (
      <>
      {/* Summary Components */}
      <div className="px-6 pt-6">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <TurbineSummary data={getTurbineSummary(turbines)} />
    <TopTurbinesByMaintenance />
  </div>
      </div>

      <ListHeader
        title="All Turbines"
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortOptions={[
          { value: "turbine_id", label: "Turbine ID" },
          { value: "model", label: "Model" },
          { value: "site_id", label: "Site ID" },
        ]}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-6">
          {paginated.map((turbine) => (
            <div
              key={turbine.turbine_id}
              onClick={() => handleCardClick(turbine.turbine_id)}
              className="bg-white p-4 rounded shadow border cursor-pointer hover:shadow-md transition"
            >
              <h2 className="font-bold text-lg text-gray-800">
                {turbine.turbine_id}
              </h2>
              <p className="text-sm text-gray-600">Model: {turbine.model}</p>
              <p className="text-sm text-gray-500">Site ID: {turbine.site_id}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-6 pb-6">
          <table className="w-full bg-white rounded shadow border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Turbine ID</th>
                <th className="p-2">Model</th>
                <th className="p-2">Site ID</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((turbine) => (
                <tr
                  key={turbine.turbine_id}
                  onClick={() => handleCardClick(turbine.turbine_id)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-2">{turbine.turbine_id}</td>
                  <td className="p-2">{turbine.model}</td>
                  <td className="p-2">{turbine.site_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center gap-4 items-center pb-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      </>
    )}
    </div>
  );
};

export default Turbines;
