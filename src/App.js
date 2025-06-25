import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sites from "./pages/Sites";
import Turbines from "./pages/Turbines";
import Blades from "./pages/Blades";
import Technicians from "./components/Technicians/index"
import Maintenance from "./pages/Maintenance";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div className="flex h-screen">
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/technicians" element={<Technicians />} />
            <Route path="/sites" element={<Sites />} />
            <Route path="/turbines" element={<Turbines />} />
            <Route path="/blades" element={<Blades />} />
            <Route path="/maintenance" element={<Maintenance />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
