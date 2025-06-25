import React from 'react';

const arrow = "→";

export default function StageFlow({ stage }) {
  const { siteId, turbineId, bladeId, maintenanceId } = stage;

  return (
    <div className="flex items-center flex-wrap space-x-2 bg-gray-50 p-4 rounded-xl shadow text-sm font-semibold">
      {siteId && (
        <span className="text-blue-600">Site: {siteId}</span>
      )}
      {turbineId && (
        <><span>{arrow}</span><span className="text-green-600">Turbine: {turbineId}</span></>
      )}
      {bladeId && (
        <><span>{arrow}</span><span className="text-purple-600">Blade: {bladeId}</span></>
      )}
      {maintenanceId && (
        <><span>{arrow}</span><span className="text-red-600">Maintenance: {maintenanceId}</span></>
      )}
    </div>
  );
}