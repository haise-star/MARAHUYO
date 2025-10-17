// src/ADMIN/components/Dashboard.jsx
import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { analytics } from "../data/analyticsData.js";

/**
 * Dashboard: sample analytics cards + 2 charts (line + bar)
 * Using Recharts for visuals (already installed above).
 */
export default function Dashboard() {
  // simple derived metrics (from analytics sample)
  const totalUsers = analytics.reduce((s, d) => s + d.users, 0);
  const totalBookings = analytics.reduce((s, d) => s + d.bookings, 0);
  const totalRevenue = analytics.reduce((s, d) => s + d.revenue, 0);

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#19183b]">Analytics Overview</h1>
        <div className="text-sm text-gray-600">Last 30 days</div>
      </div>

      {/* metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-5">
          <div className="text-sm text-gray-500">Users</div>
          <div className="text-xl font-bold text-[#19183b]">{totalUsers}</div>
          <div className="text-xs text-gray-500 mt-2">Active in the selected range</div>
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

      {/* charts */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-sm font-semibold mb-2">Bookings Over Time</div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics}>
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
          <div className="text-sm font-semibold mb-2">Revenue by Day</div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics}>
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
    </div>
  );
}
