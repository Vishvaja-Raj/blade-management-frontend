import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ListHeader from "../components/ListHeader";
import MaintenanceModal from "../components/Maintenance/MaintenanceModal";
import IssueBarChart from "../components/Maintenance/IssueBarChart";
import StatusPieChart from "../components/Maintenance/StatusPieChart";
import Loader from "../components/Loader"; // Import loader

const Maintenance = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("maintenance_id");

  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("grid");
  const [editingRecord, setEditingRecord] = useState(null);
const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;

  const location = useLocation();
  const bladeId = new URLSearchParams(location.search).get("blade_id");

  const fetchRecords = async () => {
    const endpoint = bladeId
      ? `http://localhost:8000/blades/${bladeId}/maintenance`
      : `http://localhost:8000/maintenance`;

    try {
      const res = await axios.get(endpoint);
      setRecords(res.data);
    } catch (err) {
      console.error("❌ Error fetching maintenance records:", err.message);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [bladeId]);

  useEffect(() => {
    setCurrentPage(1); // reset page when filters change
  }, [bladeId, search, sortBy, sortOrder]);

  const handleSave = async (data) => {
    try {
      if (data.maintenance_id) {
        await axios.put(`http://localhost:8000/maintenance/${data.maintenance_id}`, data);
      } else {
        await axios.post("http://localhost:8000/maintenance", data);
      }
      setEditingRecord(null);
      fetchRecords();
    } catch (err) {
      console.error("❌ Error saving maintenance record:", err.message);
    }
  };

  const filtered = records
    .filter((r) =>
      [r.maintenance_id, r.status, r.issue, r.technician, r.blade_id].some((f) =>
        String(f).toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date) - new Date(b.date);
      }
      return a[sortBy] > b[sortBy] ? 1 : -1;
    })
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
const getIssueChartData = () => {
  const issueMap = {};
  records.forEach((r) => {
    issueMap[r.issue] = (issueMap[r.issue] || 0) + 1;
  });
  return Object.entries(issueMap).map(([issue, count]) => ({ issue, count }));
};

const getStatusChartData = () => {
  const statusMap = {};
  records.forEach((r) => {
    statusMap[r.status] = (statusMap[r.status] || 0) + 1;
  });
  return Object.entries(statusMap).map(([status, value]) => ({ status, value }));
};

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pt-4">
  <IssueBarChart data={getIssueChartData()} />
  <StatusPieChart data={getStatusChartData()} />
</div>
      {/* Header and Add Button */}
      <div className="flex justify-between items-center px-6 pt-4">
        

        <ListHeader
          title={bladeId ? `Maintenance for Blade ${bladeId}` : "All Maintenance"}
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortOptions={[
            { value: "maintenance_id", label: "Maintenance ID" },
            { value: "status", label: "Status" },
            { value: "issue", label: "Issue" },
            { value: "technician", label: "Technician" },
            { value: "date", label: "Date" },
          ]}
          sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        />

        <button
          onClick={() =>
            setEditingRecord({
              blade_id: bladeId || "",
              issue: "",
              technician: "",
              status: "",
              date: new Date().toISOString().split("T")[0],
            })
          }
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Maintenance
        </button>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-6">
          {paginated.map((r) => (
            <div
              key={r.maintenance_id}
              onClick={() => setEditingRecord(r)}
              className={`border p-4 rounded shadow hover:shadow-md transition cursor-pointer ${
                r.status === "Pending"
                  ? "bg-red-100"
                  : r.status === "In Progress"
                  ? "bg-yellow-100"
                  : "bg-green-100"
              }`}
            >
              <h2 className="text-lg font-bold">Maintenance ID: {r.maintenance_id}</h2>
              <p className="text-sm text-gray-600">Issue: {r.issue}</p>
              <p className="text-sm text-gray-500">Technician: {r.technician}</p>
              <p className="text-sm text-gray-700 font-semibold">Status: {r.status}</p>
              <p className="text-sm text-gray-400">Blade ID: {r.blade_id}</p>
              <p className="text-sm text-gray-400">Date: {r.date}</p>
            </div>
          ))}
        </div>
      ) : (
        // Table View
        <div className="px-6 pb-6">
          <table className="w-full bg-white rounded shadow border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Maintenance ID</th>
                <th className="p-2">Issue</th>
                <th className="p-2">Technician</th>
                <th className="p-2">Status</th>
                <th className="p-2">Blade ID</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((r) => (
                <tr
                  key={r.maintenance_id}
                  onClick={() => setEditingRecord(r)}
                  className={`cursor-pointer ${
                    r.status === "Pending"
                      ? "bg-red-100 hover:bg-red-200"
                      : r.status === "In Progress"
                      ? "bg-yellow-100 hover:bg-yellow-200"
                      : "bg-green-100 hover:bg-green-200"
                  }`}
                >
                  <td className="p-2">{r.maintenance_id}</td>
                  <td className="p-2">{r.issue}</td>
                  <td className="p-2">{r.technician}</td>
                  <td className="p-2 font-semibold">{r.status}</td>
                  <td className="p-2">{r.blade_id}</td>
                  <td className="p-2">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
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

      {/* Modal for Add/Edit */}
      {editingRecord && (
        <MaintenanceModal
          record={editingRecord}
          onClose={() => setEditingRecord(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Maintenance;
