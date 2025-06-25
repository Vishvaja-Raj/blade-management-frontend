// components/EditModal.js
import React, { useState } from "react";

const EditModal = ({ item, type, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...item });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded shadow-md p-6 w-[90%] max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">
          Edit {type === "blade" ? "Blade Info" : "Maintenance Record"}
        </h2>

        {type === "blade" ? (
          <>
            <label className="block mb-2">
              Type:
              <input
                className="w-full border px-2 py-1 rounded"
                value={formData.type}
                onChange={handleChange("type")}
              />
            </label>
            <label className="block mb-4">
              Length:
              <input
                type="number"
                className="w-full border px-2 py-1 rounded"
                value={formData.length}
                onChange={handleChange("length")}
              />
            </label>
          </>
        ) : (
          <>
            <label className="block mb-2">
              Issue:
              <input
                className="w-full border px-2 py-1 rounded"
                value={formData.issue}
                onChange={handleChange("issue")}
              />
            </label>
            <label className="block mb-2">
              Technician:
              <input
                className="w-full border px-2 py-1 rounded"
                value={formData.technician}
                onChange={handleChange("technician")}
              />
            </label>
            <label className="block mb-4">
              Status:
              <select
                className="w-full border px-2 py-1 rounded"
                value={formData.status}
                onChange={handleChange("status")}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </label>
          </>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
