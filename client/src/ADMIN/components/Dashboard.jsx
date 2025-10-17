// src/ADMIN/components/Dashboard.jsx
import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { analytics, servicesAnalytics } from "../data/analyticsData.js";

export default function Dashboard() {
  const [selectedService, setSelectedService] = useState("All");
  const [selectedRange, setSelectedRange] = useState(30); // last 30 days

  // Filter analytics by date range and service
  const filteredAnalytics = useMemo(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - selectedRange + 1);

    return analytics
      .filter((d) => {
        const dDate = new Date(d.date);
        return dDate >= start && dDate <= end;
      })
      .filter((d) => (selectedService === "All" ? true : d.service === selectedService));
  }, [selectedRange, selectedService]);

  // Aggregated metrics
  const totalUsers = filteredAnalytics.reduce((sum, d) => sum + d.users, 0);
  const totalBookings = filteredAnalytics.reduce((sum, d) => sum + d.bookings, 0);
  const totalRevenue = filteredAnalytics.reduce((sum, d) => sum + d.revenue, 0);

  // Top services (filtered by service selection)
  const topServices = useMemo(() => {
    let data = servicesAnalytics;
    if (selectedService !== "All") {
      data = data.filter((s) => s.title === selectedService);
    }
    return data.sort((a, b) => b.bookings - a.bookings).slice(0, 5);
  }, [selectedService]);

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#19183b]">Analytics Overview</h1>

        <div className="flex space-x-2 items-center text-sm text-gray-600">
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(Number(e.target.value))}
            className="border rounded px-2 py-1 text-gray-700"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>

          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="border rounded px-2 py-1 text-gray-700"
          >
            <option value="All">All Services</option>
            {servicesAnalytics.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-5">
          <div className="text-sm text-gray-500">Users</div>
          <div className="text-xl font-bold text-[#19183b]">{totalUsers}</div>
          <div className="text-xs text-gray-500 mt-2">Active in selected range</div>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <div className="text-sm text-gray-500">Bookings</div>
          <div className="text-xl font-bold text-[#19183b]">{totalBookings}</div>
          <div className="text-xs text-gray-500 mt-2">Confirmed bookings</div>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <div className="text-sm text-gray-500">Revenue</div>
          <div className="text-xl font-bold text-[#19183b]">₱{totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-2">Estimated earnings</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-sm font-semibold mb-2">Bookings Over Time</div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredAnalytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="#ffb347" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-sm font-semibold mb-2">Revenue Overview</div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredAnalytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#19183b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Services Table */}
<div className="bg-white rounded-xl shadow p-4">
  <div className="text-lg font-semibold mb-3 text-[#19183b]">Top Services</div>
  <table className="w-full text-left text-sm border-collapse">
    <thead>
      <tr className="bg-gray-100">
        <th className="px-4 py-3 font-medium text-gray-700">Service</th>
        <th className="px-4 py-3 font-medium text-gray-700 text-right">Bookings</th>
        <th className="px-4 py-3 font-medium text-gray-700 text-right">Revenue</th>
      </tr>
    </thead>
    <tbody>
      {topServices.map((s, idx) => (
        <tr key={s.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
          <td className="px-4 py-2 font-medium text-[#19183b]">{s.title}</td>
          <td className="px-4 py-2 text-right font-semibold text-[#19183b]">{s.bookings}</td>
          <td className="px-4 py-2 text-right font-semibold text-[#19183b]">
            ₱{s.revenue.toLocaleString()}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}
