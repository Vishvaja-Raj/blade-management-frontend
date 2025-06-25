import React from 'react';

export default function TechnicalIssueSummary({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex justify-center mt-6">
        <div className="bg-white p-6 rounded-xl shadow text-gray-500 text-center max-w-md w-full">
          No maintenance summary available.
        </div>
      </div>
    );
  }

  const colors = {
    Completed: 'bg-green-100 text-green-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    Pending: 'bg-yellow-100 text-yellow-800',
  };

  const summaryArray = Object.entries(data).map(([status, count]) => ({
    status,
    count,
  }));

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white px-6 pt-6 pb-4 rounded-xl shadow w-full">
        <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Maintenance Status Summary
        </h3>
        <div className="space-y-3">
          {summaryArray.map((item) => (
            <div
              key={item.status}
              className={`flex justify-between items-center px-4 py-2 rounded-lg ${colors[item.status] || 'bg-gray-100 text-gray-700'}`}
            >
              <span className="font-medium">{item.status}</span>
              <span className="text-xl font-bold">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
