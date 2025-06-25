// src/pages/Technicians/TechnicianOverview.js
import React, { useEffect, useState } from "react";
import TechnicianFilterPanel from "./TechnicianFilterPanel";
import TechnicianCountPie from "./TechnicianCountPie";
import TechnicianStatusChart from "./TechnicianStatusChart";
import TechnicianTrendChart from "./TechnicianTrendChart";
import TechnicianRadarChart from "./TechnicianRadarChart";
import TechnicianMaintenanceTable from "./TechnicianMaintenanceTable";
import {
  fetchTechnicians,
  fetchTechnicianStatusCounts,
  fetchTechnicianTrend,
  fetchRadarData,
  fetchMaintenanceByTechnician,
} from "../../services/technicianApi";

export default function TechnicianOverview() {
  const [technicians, setTechnicians] = useState([]);

  const [statusCounts, setStatusCounts] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [radarData, setRadarData] = useState([]);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [selectedTechnician, setSelectedTechnician] = useState('Tech A');

  // Load base data (technicians list + status distribution)
  useEffect(() => {
    const loadData = async () => {
      const [techs, status] = await Promise.all([
        fetchTechnicians(),
        
      ]);
      setTechnicians(techs);
    };
    loadData();
  }, []);

  // Load data for selected technician
  useEffect(() => {
    const loadTechSpecificData = async () => {
      if (!selectedTechnician) return;
      const [radar, trend, maintenance,status] = await Promise.all([
        fetchRadarData(selectedTechnician),
        fetchTechnicianTrend(selectedTechnician),
        fetchMaintenanceByTechnician(selectedTechnician),
        fetchTechnicianStatusCounts(selectedTechnician)
      ]);
      setRadarData(radar);
      setTrendData(trend);
      setMaintenanceData(maintenance);
    setStatusCounts(status);

    };
    loadTechSpecificData();
  }, [selectedTechnician]);

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-semibold text-gray-800 text-center">Technician Analytics</h2>
      <div className = "content-center text-center">
      <TechnicianFilterPanel
        technicians={technicians}
        selected={selectedTechnician}
        onChange={setSelectedTechnician}
      />
      </div>
    <TechnicianRadarChart technician={selectedTechnician} data={radarData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TechnicianStatusChart
        technician={selectedTechnician}
        data={statusCounts}
        />
       <TechnicianTrendChart data={trendData} technician={selectedTechnician} />

      </div>


      <TechnicianMaintenanceTable
        technician={selectedTechnician}
        data={maintenanceData}
      />
    </div>
  );
}
