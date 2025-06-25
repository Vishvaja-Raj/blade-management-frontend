import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/technician';

export async function fetchTechnicians() {
  try {
    const response = await axios.get(`${BASE_URL}/technicians`);
    return response.data;
  } catch (error) {
    console.error("Error fetching technicians:", error);
    return [];
  }
}

export async function fetchTechnicianWorkload() {
  try {
    const response = await axios.get(`${BASE_URL}/technician-workload`);
    return response.data;
  } catch (error) {
    console.error("Error fetching technician workload:", error);
    return [];
  }
}

export async function fetchMaintenanceByTechnician(technician) {
  try {
    const response = await axios.get(`${BASE_URL}/technicians/${technician}/maintenance`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching maintenance for ${technician}:`, error);
    return [];
  }
}
export async function fetchAllMaintenance() {
  try {
    const response = await axios.get(`${BASE_URL}/all-maintenance`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all maintenance:", error);
    return [];
  }
}

export async function fetchTechnicianStatusCounts(technician) {
  try {
    const response = await axios.get(`${BASE_URL}/technicians/${technician}/status-counts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching technician status counts:", error);
    return [];
  }
}
export async function fetchRadarData(technician) {
  try {
    const response = await axios.get(`${BASE_URL}/technicians/${technician}/issues`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching radar data for ${technician}:`, error);
    return [];
  }
}

export async function fetchTechnicianTrend(technician) {
  try {
    const response = await axios.get(`${BASE_URL}/technicians/${technician}/trend`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching trend data for ${technician}:`, error);
    return [];
  }
}

// ✅ 2. Overall status summary (all technicians)
export async function fetchOverallStatusSummary() {
  try {
    const response = await axios.get(`${BASE_URL}/technicians/status-summary`);
    return response.data;
  } catch (error) {
    console.error("Error fetching overall status summary:", error);
    return {};
  }
}

// ✅ 3. Technician-wise total count summary
export async function fetchTechnicianCountSummary() {
  try {
    const response = await axios.get(`${BASE_URL}/technicians/summary`);
    return response.data;
  } catch (error) {
    console.error("Error fetching technician count summary:", error);
    return [];
  }
}