import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TechnicianWorkloadChart({ data }) {
  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Technician Workload</h3>
      {data.length === 0 ? (
        <p className="text-gray-500">No technician workload data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="technician" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3182CE" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
