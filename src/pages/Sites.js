import React, { useEffect, useState } from "react";
import axios from "axios";
import ListHeader from "../components/ListHeader";
import { useNavigate } from "react-router-dom";
import SiteSummary from "../components/Sites/SiteSummary";
import TopSitesByMaintenance from "../components/Sites/TopSitesByMaintenance";
import Loader from "../components/Loader"; // Import loader

const Sites = () => {
  const [sites, setSites] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/sites")
      .then((res) => setSites(res.data))
      .catch((err) => console.error("Failed to load sites:", err))
      .finally(() => setLoading(false)); // Set loading to false when done

  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset page on search/sort change
  }, [search, sortBy, sortOrder]);

  const filtered = sites
    .filter((s) =>
      [s.name, s.site_id, s.location].some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / recordsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleCardClick = (siteId) => {
    navigate(`/turbines?site_id=${siteId}`);
  };

  const handleSortFromHeader = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
  <div className="space-y-6">
    {loading ? (
      <Loader />
    ) : (
      <>
        {/* Summary Components */}
        <div className="px-6 pt-6">
          <SiteSummary />
          <div className="mt-6">
            <TopSitesByMaintenance />
          </div>
        </div>

        {/* Header */}
        <ListHeader
          title="All Sites"
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortOptions={[
            { value: "name", label: "Name" },
            { value: "location", label: "Location" },
            { value: "site_id", label: "Site ID" },
          ]}
        />

        {/* Grid or Table view */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-6">
            {paginated.map((site) => (
              <div
                key={site.site_id}
                onClick={() => handleCardClick(site.site_id)}
                className="bg-white p-4 rounded shadow border cursor-pointer hover:shadow-md transition"
              >
                <h2 className="font-bold text-lg text-gray-800">{site.name}</h2>
                <p className="text-sm text-gray-600">Location: {site.location}</p>
                <p className="text-sm text-gray-500">Site ID: {site.site_id}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 pb-6">
            <table className="w-full bg-white rounded shadow border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 cursor-pointer hover:underline" onClick={() => handleSortFromHeader("name")}>
                    Name {sortBy === "name" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th className="p-2 cursor-pointer hover:underline" onClick={() => handleSortFromHeader("location")}>
                    Location {sortBy === "location" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th className="p-2 cursor-pointer hover:underline" onClick={() => handleSortFromHeader("site_id")}>
                    Site ID {sortBy === "site_id" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((site) => (
                  <tr
                    key={site.site_id}
                    onClick={() => handleCardClick(site.site_id)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-2">{site.name}</td>
                    <td className="p-2">{site.location}</td>
                    <td className="p-2">{site.site_id}</td>
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
      </>
    )}
  </div>
);

};

export default Sites;
