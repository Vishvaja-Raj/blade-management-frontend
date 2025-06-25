import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ListHeader from "../components/ListHeader";
import BladeEditModal from "../components/Blades/BladeEditModal";
import Loader from "../components/Loader"; // 👈 Import the loader

const Blades = () => {
  const [blades, setBlades] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("blade_id");
  const [viewMode, setViewMode] = useState("grid");
  const [sortOrder, setSortOrder] = useState("asc");

  const [selectedBlade, setSelectedBlade] = useState(null);
  const [filters, setFilters] = useState({ turbineId: "", siteId: "", status: "", length: "", flag:"" });

  const [currentPage, setCurrentPage] = useState(1);
  const bladesPerPage = 12;

  const location = useLocation();
  const navigate = useNavigate();
  const turbineId = new URLSearchParams(location.search).get("turbine_id");
 const [loading, setLoading] = useState(true); // 👈 Add this state

useEffect(() => {
  const fetchBlades = async () => {
    try {
      const res = await axios.get("http://localhost:8000/blades");
      setBlades(res.data);
    } catch (err) {
      console.error("Error loading blades:", err.message);
    } finally {
      setLoading(false); // 👈 Hide loader after data fetch
    }
  };
  fetchBlades();
}, []);




  useEffect(() => {
    const fetchBlades = async () => {
      try {
        const res = await axios.get("http://localhost:8000/blades");
        setBlades(res.data);
      } catch (err) {
        console.error("Error loading blades:", err.message);
      }
    };
    fetchBlades();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortBy, filters,sortOrder]);

  const handleEditClick = (blade) => {
    setSelectedBlade(blade);
  };
const isFrequentMaintainer = (blade) => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const recentCount = (blade.maintenance || []).filter((m) => {
    const date = new Date(m.date);
    return date >= oneYearAgo;
  }).length;

  return recentCount >= 3;
};

const hasRepeatedIssues = (blade) => {
  const issues = (blade.maintenance || []).map((m) => m.issue.trim().toLowerCase());
  const issueCount = {};

  for (const issue of issues) {
    issueCount[issue] = (issueCount[issue] || 0) + 1;
    if (issueCount[issue] >= 2) return true;
  }

  return false;
};

  const handleSave = async (updatedBlade) => {
    try {
      await axios.put(`http://localhost:8000/blades/${updatedBlade.blade_id}`, updatedBlade);
      setBlades((prev) =>
        prev.map((b) => (b.blade_id === updatedBlade.blade_id ? updatedBlade : b))
      );
      setSelectedBlade(null);
    } catch (err) {
      console.error("Failed to update blade:", err.message);
    }
  };

  // 🔹 Get latest maintenance status
  const getLatestStatus = (blade) => {
    if (!blade.maintenance || blade.maintenance.length === 0) return "No Record";
    return blade.maintenance[blade.maintenance.length - 1].status;
  };

  // 🔹 Get color based on latest maintenance status
  const getLatestStatusColor = (blade) => {
    const status = getLatestStatus(blade);
    switch (status) {
      case "Pending":
        return "bg-red-100";
      case "In Progress":
        return "bg-yellow-100";
      case "Completed":
        return "bg-green-100";
      default:
        return "bg-white";
    }
  };



  const filtered = blades
    .filter((blade) =>
      [blade.blade_id, blade.type, blade.length, blade.turbine_id].some((field) =>
        String(field).toLowerCase().includes(search.toLowerCase())
      )
    )
    .filter((b) =>
      (!filters.turbineId || b.turbine_id === filters.turbineId) &&
      (!filters.siteId || b.site_id === filters.siteId) &&
      (!filters.status || getLatestStatus(b) === filters.status) &&
      (!filters.length || String(b.length) === filters.length)
    )
    .filter((b) => (!turbineId || b.turbine_id === turbineId))
    .filter((b) => {
  if (filters.flag === "frequent") return isFrequentMaintainer(b);
  if (filters.flag === "repeated") return hasRepeatedIssues(b);
  return true;
})
    .sort((a, b) => {
      const aVal = a[sortBy]?.toLowerCase?.() || a[sortBy];
      const bVal = b[sortBy]?.toLowerCase?.() || b[sortBy];
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / bladesPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * bladesPerPage,
    currentPage * bladesPerPage
  );

  return (
    <div className="space-y-6">
      {loading ? (
      <Loader />
    ) : (
      <ListHeader
        title="All Blades"
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortOptions={[
          { value: "blade_id", label: "Blade ID" },
          { value: "type", label: "Type" },
          { value: "length", label: "Length" },
          { value: "status", label: "Status" },
        ]}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    )}

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={filters.turbineId}
          onChange={(e) => setFilters((f) => ({ ...f, turbineId: e.target.value }))}
          className="border p-2 rounded"
        >
          <option value="">All Turbines</option>
          {[...new Set(blades.map((b) => b.turbine_id))].map((id) => (
            <option key={`turbine-${id}`} value={id}>{id}</option>
          ))}
        </select>

        <select
          value={filters.length}
          onChange={(e) => setFilters((f) => ({ ...f, length: e.target.value }))}
          className="border p-2 rounded"
        >
          <option value="">All Lengths</option>
          {[...new Set(blades.map((b) => b.length))].map((len) => (
            <option key={`length-${len}`} value={len}>{len}</option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          {[...new Set(blades.map(getLatestStatus))].map((s) => (
            <option key={`status-${s}`} value={s}>{s}</option>
          ))}
        </select>
        <select
  value={filters.flag}
  onChange={(e) => setFilters((f) => ({ ...f, flag: e.target.value }))}
  className="border p-2 rounded"
>
  <option value="">All Flags</option>
  <option value="frequent">🔵 Frequent</option>
  <option value="repeated">🟣 Repeated</option>
</select>

      </div>

      {/* Blade Cards or Table */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {paginated.map((blade) => (
    <div
      key={blade.blade_id}
      onClick={() => navigate(`/maintenance?blade_id=${blade.blade_id}`)}
      className={`border rounded-lg p-4 shadow relative cursor-pointer hover:shadow-lg ${getLatestStatusColor(blade)}`}
    >
      {/* Top-right flags */}
      <div className="absolute top-2 right-2 space-y-1 flex flex-col items-end z-10">
        {isFrequentMaintainer(blade) && (
          <div
            className="bg-blue-500 text-white text-[10px] px-2 py-1 rounded-bl-lg shadow hover:opacity-90"
            title="3+ maintenance activities in the last 12 months"
          >
            🔵 Frequent
          </div>
        )}
        {hasRepeatedIssues(blade) && (
          <div
            className="bg-purple-500 text-white text-[10px] px-2 py-1 rounded-bl-lg shadow hover:opacity-90"
            title="Repeated maintenance issue detected"
          >
            🟣 Repeated
          </div>
        )}
      </div>

      {/* Edit Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleEditClick(blade);
        }}
        className="absolute top-2 right-2 text-sm text-gray-500 hover:text-blue-600"
        title="Edit"
      >
        ✎
      </button>

      {/* Blade Details */}
      <h2 className="font-bold text-lg text-gray-800">Blade ID: {blade.blade_id}</h2>
      <p className="text-sm text-gray-600">Type: {blade.type}</p>
      <p className="text-sm text-gray-500">Length: {blade.length}</p>
      <p className="text-sm text-gray-400">Turbine ID: {blade.turbine_id}</p>
      <p className="text-sm text-gray-600 font-medium mt-1">
        Status: {getLatestStatus(blade)}
      </p>
      {blade.maintenance?.length > 0 && (
        <p className="text-xs text-gray-500 mt-2">
          {blade.maintenance.length} maintenance record(s)
        </p>
      )}
    </div>
  ))}
</div>

      ) : (
        <table className="w-full bg-white rounded shadow border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Blade ID</th>
              <th className="p-2">Type</th>
              <th className="p-2">Length</th>
              <th className="p-2">Turbine ID</th>
              <th className="p-2">Status</th>
              <th className="p-2">Edit</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((blade) => (
              <tr
                key={blade.blade_id}
                className={`cursor-pointer hover:bg-gray-50 ${getLatestStatusColor(blade)}`}
                onClick={() => navigate(`/maintenance?blade_id=${blade.blade_id}`)}
              >
                <td className="p-2">{blade.blade_id}</td>
                <td className="p-2">{blade.type}</td>
                <td className="p-2">{blade.length}</td>
                <td className="p-2">{blade.turbine_id}</td>
                <td className="p-2 font-medium">
  {getLatestStatus(blade)}
  <div className="mt-1 flex gap-1 flex-wrap">
    {isFrequentMaintainer(blade) && (
      <span
        className="bg-blue-200 text-blue-800 text-[10px] px-1 rounded"
        title="3+ maintenance activities in the last 12 months"
      >
        🔵 Frequent
      </span>
    )}
    {hasRepeatedIssues(blade) && (
      <span
        className="bg-purple-200 text-purple-800 text-[10px] px-1 rounded"
        title="Repeated maintenance issue detected"
      >
        🟣 Repeated
      </span>
    )}
  </div>
</td>

                <td className="p-2 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(blade);
                    }}
                    title="Edit"
                  >
                    ✎
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-1 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-1">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-1 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {selectedBlade && (
        <BladeEditModal
          blade={selectedBlade}
          onClose={() => setSelectedBlade(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Blades;
