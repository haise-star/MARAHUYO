// src/ADMIN/components/BookingsPage.jsx
import React from "react";

/**
 * BookingsPage: admin listing with sample table (placeholder)
 * Replace with real data fetch for production.
 */
export default function BookingsPage() {
  const sample = [
    { id: "B-1001", name: "Jane Doe", service: "Wedding", date: "2025-11-21", status: "Confirmed" },
    { id: "B-1002", name: "Mark Lee", service: "Corporate", date: "2025-11-23", status: "Pending" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#19183b]">Bookings</h2>
        <div className="text-sm text-gray-600">Manage all bookings</div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#19183b]">
            <tr>
              <th className="p-3 text-left">Booking ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {sample.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-3">{s.id}</td>
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.service}</td>
                <td className="p-3">{s.date}</td>
                <td className="p-3">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
