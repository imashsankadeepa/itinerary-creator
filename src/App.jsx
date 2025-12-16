import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HotelManagement from "./pages/HotelManagement";
import ClientRequests from "./pages/ClientRequests";
import LocationManagement from "./pages/LocationManagement";
import Sidebar from "./components/Sidebar";
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/*" element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>;
}
function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hotels" element={<HotelManagement />} />
          <Route path="/requests" element={<ClientRequests />} />
          <Route path="/locations" element={<LocationManagement />} />
        </Routes>
      </div>
    </div>;
}