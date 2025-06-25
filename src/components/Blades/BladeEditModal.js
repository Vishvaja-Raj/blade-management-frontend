import React, { useState, useEffect } from "react";

export default function BladeEditModal({ blade, onSave, onClose }) {
  const [type, setType] = useState("");
  const [length, setLength] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (blade) {
      setType(blade.type || "");
      setLength(blade.length || "");
    }
  }, [blade]);

  const handleSave = () => {
    if (!type.trim()) {
      setError("Blade type cannot be empty.");
      return;
    }
    const parsedLength = parseFloat(length);
    if (isNaN(parsedLength) || parsedLength <= 0) {
      setError("Length must be a positive number.");
      return;
    }

    setError(""); // clear error
    onSave({ ...blade, type: type.trim(), length: parsedLength });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-lg font-semibold mb-4">Edit Blade</h2>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <label className="block mb-2">
          Type:
          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-1 w-full mt-1"
          />
        </label>

        <label className="block mb-2">
          Length:
          <input
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="border p-1 w-full mt-1"
          />
        </label>

        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="text-gray-600">Cancel</button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
