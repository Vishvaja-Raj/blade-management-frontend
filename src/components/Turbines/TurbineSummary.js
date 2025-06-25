import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Sector,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#60a5fa', '#facc15', '#34d399', '#f87171',
  '#a78bfa', '#fbbf24', '#4ade80', '#f472b6',
];

export default function TurbineSummary({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex justify-center mt-6">
        <div className="bg-white p-6 rounded-xl shadow text-gray-500 text-center w-full max-w-md">
          No turbine summary available.
        </div>
      </div>
    );
  }

  const formattedData = Object.entries(data).map(([model, count]) => ({
    name: model,
    value: count,
  }));

  const total = formattedData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl">
        <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Turbine Model Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={formattedData}
              cx="50%"
              cy="50%"
              outerRadius={110}
              dataKey="value"
              nameKey="name"
              isAnimationActive={true}
              labelLine={false} // ✅ no lines
            >
              {formattedData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} units`, name]}
              labelFormatter={(label) =>
                `${label} (${((data[label] / total) * 100).toFixed(1)}%)`
              }
            />
            <Legend verticalAlign="middle" align="right" layout="vertical" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
