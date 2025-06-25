import React, { useEffect, useState } from 'react';
import { fetchProblemBlades } from '../../services/dashboardApi';

export default function ProblemBlades() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchProblemBlades().then(setData);
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">Top 5 Problematic Blades</h3>
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Blade ID</th>
            <th className="px-4 py-2 border">Total Maintenance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td className="px-4 py-2 border">{item.bladeId}</td>
              <td className="px-4 py-2 border">{item.maintenanceCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}