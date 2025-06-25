import React from 'react';

export default function RecurringIssues({ data }) {
  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Recurring Issues (3+ times per blade)</h3>
      {data.length === 0 ? (
        <p className="text-gray-500">No recurring issues found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Blade ID</th>
                <th className="px-4 py-2 border">Issue</th>
                <th className="px-4 py-2 border">Occurrences</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border font-medium">{item.bladeId}</td>
                  <td className="px-4 py-2 border">{item.issue}</td>
                  <td className="px-4 py-2 border">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
