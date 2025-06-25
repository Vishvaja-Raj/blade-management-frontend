import React, { useState } from 'react';

export default function PriorityList({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: 'bladeId', direction: 'asc' });

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const renderHeader = (label, key) => (
    <th
      onClick={() => handleSort(key)}
      className="px-4 py-2 border cursor-pointer hover:bg-gray-200"
    >
      {label} {sortConfig.key === key ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
    </th>
  );

  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">High-Priority Maintenance</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {renderHeader("Blade ID", "bladeId")}
              {renderHeader("Issue", "issue")}
              {renderHeader("Date Raised", "date")}
              {renderHeader("Technician Assigned", "technician")}
              {renderHeader("Status", "status")}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 border font-medium">{item.bladeId}</td>
                <td className="px-4 py-2 border">{item.issue}</td>
                <td className="px-4 py-2 border">{item.date}</td>
                <td className="px-4 py-2 border">{item.technician}</td>
                <td className="px-4 py-2 border">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
