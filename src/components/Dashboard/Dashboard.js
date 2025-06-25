import React, { useEffect, useState } from 'react';
import DashboardOverview from './DashboardOverview';
import MaintenanceCharts from './MaintenanceChart';
import PriorityList from './PriorityList';
import StageFlow from './StageFlow';
import IssuesBySiteChart from './IssuesBySiteChart';
import TechnicianWorkloadChart from './TechnicianWorkloadChart';
import RecurringIssues from './RecurringIssues';
import BladesDueChart from './BladesDueChart';
import axios from "axios";
import Loader from '../../components/Loader'; // Make sure path is correct
import GlobalSearchBar from "../../components/GlobalSearchBar";

import {
  fetchDashboardSummary,
  fetchMaintenanceTrends,
  fetchPriorityList,
  fetchIssuesBySite,
  fetchTechnicianWorkload,
  fetchRecurringIssues,
} from '../../services/dashboardApi';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState(null);
  const [priorityList, setPriorityList] = useState([]);
  const [issuesBySite, setIssuesBySite] = useState([]);
  const [workload, setWorkload] = useState([]);
  const [recurringIssues, setRecurringIssues] = useState([]);
  const [turbines, setTurbines] = useState([]);

  const [stage, setStage] = useState({
    siteId: null,
    turbineId: null,
    bladeId: null,
    maintenanceId: null,
  });

  const fetchTurbines = async () => {
    try {
      const res = await axios.get("http://localhost:8000/turbines");
      setTurbines(res.data);
    } catch (err) {
      console.error("Failed to fetch turbines:", err.message);
    }
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        await Promise.all([
          fetchDashboardSummary().then(setSummary),
          fetchMaintenanceTrends().then(setTrends),
          fetchPriorityList().then(setPriorityList),
          fetchIssuesBySite().then(setIssuesBySite),
          fetchTechnicianWorkload().then(setWorkload),
          fetchRecurringIssues().then(setRecurringIssues),
          fetchTurbines(),
        ]);
      } catch (error) {
        console.error("Dashboard data load error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-6">
      <GlobalSearchBar />

      {summary && <DashboardOverview data={summary} />}
      {trends && <MaintenanceCharts data={trends} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IssuesBySiteChart rawData={issuesBySite} />
        <TechnicianWorkloadChart data={workload} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BladesDueChart data={turbines} />
        <RecurringIssues data={recurringIssues} />
      </div>

      <PriorityList data={priorityList} />
    </div>
  );
}
