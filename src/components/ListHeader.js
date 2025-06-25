import React, { useState } from "react";

const ListHeader = ({
  title = "",
  search = "",
  setSearch = () => {},
  sortBy = "",
  setSortBy = () => {},
  sortOrder = "asc",
  setSortOrder = () => {},
  viewMode = "grid",
  setViewMode = () => {},
  sortOptions = [],
}) => {
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setSortOrder("asc"); // Reset to ascending when field changes
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 px-6">
      <h1 className="text-2xl font-semibold text-black">{title}</h1>

      <div className="flex items-center gap-4 flex-wrap">
        {/* Search Box */}
        <div className="relative w-60">
          <input
            type="text"
            placeholder="Type to search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-4 py-2 rounded-full bg-white text-sm border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          />
        </div>

        {/* Sort Field & Direction Toggle */}
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-300 px-3 py-1 rounded-md text-sm bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-black"
          >
            {Array.isArray(sortOptions) &&
              sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
          </select>

          {/* Black arrow toggle */}
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            title="Toggle sort order"
            className="text-sm text-black border rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100"
          >
            {sortOrder === "asc" ? "▲" : "▼"}
          </button>
        </div>

        {/* Grid / Table toggle */}
        <button
          onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
          className="text-lg text-black"
          title="Toggle view mode"
        >
          {viewMode === "grid" ? "📋" : "🔳"}
        </button>
      </div>
    </div>
  );
};

export default ListHeader;
