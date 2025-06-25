import React from 'react';
import DashboardCard from './DashboardCard';

export default function DashboardOverview({ data }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <DashboardCard title="Total Blades(overall)" value={data.totalBlades} color="blue" />
      <DashboardCard title="Total Maintenances(overall)" value={data.totalMaintenances} color="green" />
      <DashboardCard title="Pending Maintenances" value={data.pending} color="red" />
      <DashboardCard title="Total blades maintained this year" value={data.maintainedThisYear} color="orange" />
    </div>
  );
}
