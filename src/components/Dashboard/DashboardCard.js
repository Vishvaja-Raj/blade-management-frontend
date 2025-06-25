import React from 'react';

export default function DashboardCard({ title, value, color }) {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    orange: 'bg-orange-100 text-orange-800',
  };

  return (
    <div className={`p-4 rounded-xl shadow ${colorMap[color] || 'bg-gray-100 text-gray-800'}`}>
      <h4 className="text-sm font-medium mb-1">{title}</h4>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
