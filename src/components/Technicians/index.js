import React, { useEffect, useState } from 'react';
import TechnicianOverview from './TechnicianOverview';
import TechnicianCountPie from './TechnicianCountPie';
import TechnicianTrendChart from './TechnicianTrendChart';
import TechnicianRadarChart from './TechnicianRadarChart';
import TechnicianMaintenanceTable from './TechnicianMaintenanceTable';
import TechnicianFilterPanel from './TechnicianFilterPanel';
import TechnicalssueSummary from './TechnicalssueSummary';
import Loader from '../../components/Loader';

import {
  fetchTechnicianWorkload,
  fetchMaintenanceByTechnician,
  fetchTechnicians,
  fetchTechnicianTrend,
  fetchRadarData,
  fetchOverallStatusSummary
} from '../../services/technicianApi';

export default function TechniciansPage() {
  const [loading, setLoading] = useState(true);
  const [workload, setWorkload] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedTech, setSelectedTech] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [radarData, setRadarData] = useState([]);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [statusSummary, setStatusSummary] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchTechnicianWorkload().then(setWorkload),
          fetchTechnicians().then(setTechnicians),
          fetchTechnicianTrend().then(setTrendData),
          fetchRadarData(selectedTech).then(setRadarData),
          fetchOverallStatusSummary().then(setStatusSummary),
        ]);
      } catch (err) {
        console.error("Failed to load technician data", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadMaintenance = async () => {
      if (selectedTech) {
        setLoading(true);
        try {
          const data = await fetchMaintenanceByTechnician(selectedTech);
          setMaintenanceData(data);
        } catch (err) {
          console.error("Failed to load technician maintenance", err);
        } finally {
          setLoading(false);
        }
      }
    };
    loadMaintenance();
  }, [selectedTech]);



  return (
    <div className="p-6 space-y-6">
{loading ? (
      <Loader />
    ) : (
      <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TechnicianCountPie data={workload} />
        <TechnicalssueSummary data={statusSummary} />
      </div>

      <TechnicianOverview workload={workload} />

      {selectedTech && (
        <TechnicianMaintenanceTable
          technician={selectedTech}
          data={maintenanceData}
        />
      )}
      </>
    )}
    </div>
  );
}
