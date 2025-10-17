// src/ADMIN/AdminApp.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminNavbar from "./components/AdminNavbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import BookingsPage from "./components/BookingsPage.jsx";
import DateTimeManagement from "./components/DateTimeManagement.jsx";
import InsightsReports from "./components/InsightsReports.jsx";
import MessagesPage from "./components/MessagesPage.jsx";
import PaymentManagement from "./components/PaymentManagement.jsx";

export default function AdminApp() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f7f8fa] overflow-hidden">
      {/* Sidebar */}
      <Sidebar onToggle={setCollapsed} />

      {/* Main content area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Top Navbar */}
        <div className="fixed top-0 left-0 right-0 z-40">
          <AdminNavbar />
        </div>

        {/* Page content */}
        <main className="flex-1 pt-20 px-4 md:px-8 pb-10">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="datetime" element={<DateTimeManagement />} />
            <Route path="insights" element={<InsightsReports />} />
            <Route path="payments" element={<PaymentManagement />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
