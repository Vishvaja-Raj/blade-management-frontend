import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function TechnicianStatusChart({ technician, data }) {
  if (!technician || !data || data.length === 0) {
    return <p className="text-gray-500">No data available</p>;
  }

  // Transform array of objects into a single object: { Completed: 229, ... }
  const transformed = data.reduce((acc, curr) => {
    acc[curr.status] = curr.count;
    return acc;
  }, {});

  const chartData = [
    {
      name: technician,
      ...transformed,
    },
  ];

  const statusKeys = Object.keys(transformed);

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">Status Distribution for {technician}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {statusKeys.map((status, idx) => (
            <Bar
              key={status}
              dataKey={status}
              fill={`hsl(${(idx * 60) % 360}, 70%, 60%)`}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
