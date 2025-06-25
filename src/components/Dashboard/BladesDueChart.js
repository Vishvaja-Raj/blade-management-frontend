import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#60a5fa', '#facc15', '#10b981', '#f87171',
  '#a78bfa', '#f472b6', '#34d399', '#f97316',
  '#2dd4bf', '#c084fc'
];

const renderCustomLabel = ({ name, percent }) => {
  return `${name} (${(percent * 100).toFixed(1)}%)`;
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const { name, value, percent } = payload[0];
  return (
    <div className="bg-white border border-gray-300 shadow-lg p-3 rounded text-sm">
      <p className="font-semibold">{name}</p>
      <p>Count: {value}</p>
      <p>Share: {(percent * 100).toFixed(1)}%</p>
    </div>
  );
};

const BladesDueChart = ({ data }) => {
  // Aggregate turbines by model
  const modelMap = {};
  (data || []).forEach(t => {
    const model = t.model || 'Unknown';
    modelMap[model] = (modelMap[model] || 0) + 1;
  });

  const formattedData = Object.entries(modelMap).map(([model, count]) => ({
    name: model,
    value: count,
  }));

  return (
    <div className="mt-6 bg-white p-6 rounded-2xl shadow w-full flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-6 text-center">Turbine Model Distribution</h3>
      {formattedData.length === 0 ? (
        <p className="text-gray-500">No turbine model data available.</p>
      ) : (
        <div className="w-full max-w-3xl h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formattedData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                labelLine={false}
                label={renderCustomLabel}
                isAnimationActive={true}
              >
                {formattedData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default BladesDueChart;
