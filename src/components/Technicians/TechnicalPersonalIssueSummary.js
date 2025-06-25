// src/components/Technicians/TechnicianIssueNumbers.js
import React from "react";

export default function TechnicianIssueNumbers({ technician, data }) {
  if (!technician || !data || data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow text-gray-500">
        No data for technician.
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">
        Issue Breakdown for {technician}
      </h3>
      <table className="w-full text-left border-t border-gray-200">
        <thead>
          <tr className="text-sm text-gray-600">
            <th className="py-2">Issue</th>
            <th className="py-2">Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.issue} className="border-t text-sm text-gray-800">
              <td className="py-1">{item.issue}</td>
              <td className="py-1">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
