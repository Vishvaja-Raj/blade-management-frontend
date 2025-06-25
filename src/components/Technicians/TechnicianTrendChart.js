// src/pages/Technicians/TechnicianTrendChart.js
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TechnicianTrendChart({ data, technician }) {
  if (!data || data.length === 0) return null;

  // Expected data format: [{ month: 'Jan', count: 5 }, ...]
  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">
        Monthly Trend for {technician}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#34d399" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
