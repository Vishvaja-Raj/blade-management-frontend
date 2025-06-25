import React, { useState, useEffect } from "react";
import axios from "axios";

const MaintenanceModal = ({ record, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    maintenance_id: "",
    blade_id: "",
    issue: "",
    technician: "",
    status: "",
    date: "",
  });
  const [formError, setFormError] = useState("");
  const [bladeOptions, setBladeOptions] = useState([]);

  useEffect(() => {
    if (record) {
      setFormData({
        maintenance_id: record.maintenance_id || "",
        blade_id: record.blade_id || "",
        issue: record.issue || "",
        technician: record.technician || "",
        status: record.status || "",
        date: record.date || new Date().toISOString().split("T")[0],
      });
    }

    if (!record?.blade_id) {
      axios.get("http://localhost:8000/blades").then((res) => {
        setBladeOptions(res.data.map((b) => b.blade_id));
      });
    }
  }, [record]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const { blade_id, issue, technician, status, date } = formData;
    if (!blade_id || !issue || !technician || !status || !date) {
      setFormError("All fields are required.");
      return;
    }
    setFormError("");
    onSave(formData);
  };

  const issues = ["Crack", "Delamination", "Erosion", "Lightning Damage", "Split", "Wear", "Other"];
  const technicians = ["Tech A", "Tech B", "Tech C", "Tech D"];
  const statuses = ["Pending", "In Progress", "Completed"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-lg font-semibold mb-4">
          {formData.maintenance_id ? "Edit Maintenance" : "Add Maintenance"}
        </h2>

        {formError && <p className="text-red-600 text-sm mb-2">{formError}</p>}

        {/* Blade ID */}
        {record?.blade_id ? (
          <p className="mb-2 font-medium text-gray-700">Blade ID: {formData.blade_id}</p>
        ) : (
          <label className="block mb-2">
            Blade ID:
            <select
              value={formData.blade_id}
              onChange={(e) => handleChange("blade_id", e.target.value)}
              className="border p-1 w-full mt-1"
            >
              <option value="">Select Blade</option>
              {bladeOptions.map((id) => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
          </label>
        )}

        {/* Issue */}
        <label className="block mb-2">
          Issue:
          <select
            value={formData.issue}
            onChange={(e) => handleChange("issue", e.target.value)}
            className="border p-1 w-full mt-1"
          >
            <option value="">Select Issue</option>
            {issues.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>

        {/* Technician */}
        <label className="block mb-2">
          Technician:
          <select
            value={formData.technician}
            onChange={(e) => handleChange("technician", e.target.value)}
            className="border p-1 w-full mt-1"
          >
            <option value="">Select Technician</option>
            {technicians.map((tech) => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </label>

        {/* Status */}
        <label className="block mb-2">
          Status:
          <select
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="border p-1 w-full mt-1"
          >
            <option value="">Select Status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>

        {/* Date */}
        <label className="block mb-2">
          Date:
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="border p-1 w-full mt-1"
            
          />
        </label>

        {/* Actions */}
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="text-gray-600">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-3 py-1 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceModal;
