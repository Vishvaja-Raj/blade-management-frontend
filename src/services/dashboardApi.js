import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/dashboard';

export async function fetchDashboardSummary() {
  try {
    const response = await axios.get(`${BASE_URL}/summary`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    return null;
  }
}

export async function fetchMaintenanceTrends() {
  try {
    const response = await axios.get(`${BASE_URL}/trends`);
    return response.data;
  } catch (error) {
    console.error("Error fetching maintenance trends:", error);
    return null;
  }
}

export async function fetchPriorityList() {
  try {
    const response = await axios.get(`${BASE_URL}/priority`);
    return response.data;
  } catch (error) {
    console.error("Error fetching priority list:", error);
    return [];
  }
}

export async function fetchIssuesBySite() {
  try {
    const response = await axios.get(`${BASE_URL}/issues-by-site`);
    return response.data;
  } catch (error) {
    console.error("Error fetching issues by site:", error);
    return {};
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

export async function fetchRecurringIssues() {
  try {
    const response = await axios.get(`${BASE_URL}/recurring-issues`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recurring issues:", error);
    return [];
  }
}

export async function fetchBladesDue() {
  try {
    const response = await axios.get(`${BASE_URL}/blades-due`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blades due for inspection:", error);
    return [];
  }
}

export async function fetchTechnicians() {
  try {
    const response = await axios.get(`${BASE_URL}/technicians`);
    return response.data;
  } catch (error) {
    console.error("Error fetching technicians:", error);
    return [];
  }
}

export async function fetchTechnicianMaintenance(name) {
  try {
    const response = await axios.get(`${BASE_URL}/technicians/${name}/maintenance`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching maintenance for technician ${name}:`, error);
    return [];
  }
}
