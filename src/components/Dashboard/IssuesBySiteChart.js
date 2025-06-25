import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Utility: Transform the raw object into a list of records for stacked bar chart
function transformIssuesData(data) {
  const allIssues = new Set();
  const transformed = Object.entries(data).map(([siteId, issues]) => {
    const entry = { siteId };
    for (const [issue, count] of Object.entries(issues)) {
      entry[issue] = count;
      allIssues.add(issue);
    }
    return entry;
  });
  return { data: transformed, keys: Array.from(allIssues) };
}

export default function IssuesBySiteChart({ rawData }) {
  const { data, keys } = transformIssuesData(rawData || {});

  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Issues per Site</h3>
      {data.length === 0 ? (
        <p className="text-gray-500">No data available for issues per site.</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="siteId" />
            <YAxis />
            <Tooltip />
            <Legend />
            {keys.map((issue, index) => (
              <Bar key={issue} dataKey={issue} stackId="a" fill={`hsl(${index * 50 % 360}, 70%, 60%)`} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
