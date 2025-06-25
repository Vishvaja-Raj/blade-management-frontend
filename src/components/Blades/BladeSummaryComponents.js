import React, { useEffect, useState } from "react";
import axios from "axios";
import ListHeader from "../components/ListHeader";
import { useNavigate, useLocation } from "react-router-dom";
import BladeEditModal from "../components/Blades/BladeEditModal";

const BladeSummary = () => {
  const [summary, setSummary] = useState({ total: 0, commonType: "N/A" });

  useEffect(() => {
    axios.get("http://localhost:8000/blades")
      .then(res => {
        const blades = res.data;
        const total = blades.length;

        const typeCount = {};
        blades.forEach(b => {
          typeCount[b.type] = (typeCount[b.type] || 0) + 1;
        });

        const commonType = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

        setSummary({ total, commonType });
      })
      .catch(err => console.error("Failed to load blade summary", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 pt-6">
      <div className="bg-purple-100 shadow rounded p-4">
        <h3 className="text-lg font-bold mb-2 text-purple-900">Total Blades</h3>
        <p className="text-3xl font-semibold text-purple-900">{summary.total}</p>
      </div>
      <div className="bg-indigo-100 shadow rounded p-4">
        <h3 className="text-lg font-bold mb-2 text-indigo-900">Most Common Type</h3>
        <p className="text-3xl font-semibold text-indigo-900">{summary.commonType}</p>
      </div>
    </div>
  );
};

export default BladeSummary;
