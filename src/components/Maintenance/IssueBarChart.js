import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const IssueBarChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Maintenance by Issue Type
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="issue" tick={{ fill: '#6B7280' }} />
          <YAxis allowDecimals={false} tick={{ fill: '#6B7280' }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "0.5rem", borderColor: "#d1d5db" }}
            labelStyle={{ color: "#374151" }}
          />
          <Bar dataKey="count" fill="#a5b4fc" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IssueBarChart;
