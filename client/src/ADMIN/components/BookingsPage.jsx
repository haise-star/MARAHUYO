// src/ADMIN/components/BookingsPage.jsx
import React, { useState, useMemo } from "react";

export default function BookingsPage() {
  const sample = [
    { id: "B-1001", name: "Jane Doe", service: "Wedding", date: "2025-11-21", status: "Confirmed" },
    { id: "B-1002", name: "Mark Lee", service: "Corporate", date: "2025-11-23", status: "Pending" },
    { id: "B-1003", name: "Alice Smith", service: "Portrait", date: "2025-11-20", status: "Confirmed" },
    { id: "B-1004", name: "Bob Johnson", service: "Event", date: "2025-11-22", status: "Cancelled" },
    { id: "B-1005", name: "Cathy Wong", service: "Wedding", date: "2025-11-19", status: "Confirmed" },
  ];

  // Filters state
  const [filterService, setFilterService] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDate, setFilterDate] = useState("");

  // Filtered data
  const filteredData = useMemo(() => {
    return sample.filter((b) => {
      const serviceMatch = filterService === "All" || b.service === filterService;
      const statusMatch = filterStatus === "All" || b.status === filterStatus;
      const dateMatch = !filterDate || b.date === filterDate;
      return serviceMatch && statusMatch && dateMatch;
    });
  }, [filterService, filterStatus, filterDate]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#19183b]">Bookings</h2>
      </div>

     {/* Filters */}
        <div className="flex flex-wrap gap-3 bg-white rounded-xl shadow p-4">
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className="border rounded px-3 py-2 text-gray-700"
          >
            <option value="All">All Services</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate">Corporate</option>
            <option value="Portrait">Portrait</option>
            <option value="Event">Event</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded px-3 py-2 text-gray-700"
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border rounded px-3 py-2 text-gray-700"
          />

        <button
          onClick={() => {
            setFilterService("All");
            setFilterStatus("All");
            setFilterDate("");
          }}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#19183b] to-[#ffb347] text-white px-4 py-2 rounded-md hover:scale-105 transition"
        >
          Clear Filters
        </button>

        </div>


      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-[#19183b] text-white">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Booking ID</th>
              <th className="px-4 py-3 text-left font-medium">Customer</th>
              <th className="px-4 py-3 text-left font-medium">Service</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((s, idx) => (
              <tr key={s.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-4 py-2 font-medium text-gray-800">{s.id}</td>
                <td className="px-4 py-2 text-gray-800">{s.name}</td>
                <td className="px-4 py-2 text-gray-800">{s.service}</td>
                <td className="px-4 py-2 text-gray-800">{s.date}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    s.status === "Confirmed"
                      ? "text-green-600"
                      : s.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {s.status}
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
