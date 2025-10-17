// src/ADMIN/components/InsightsReports.jsx
import React from "react";

/**
 * InsightsReports: placeholder page
 * Hook real metrics and charts here as needed.
 */
export default function InsightsReports() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#19183b]">Insights & Reports</h2>
        <div className="text-sm text-gray-600">Export and analyze data</div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-600 mb-4">Quick reports (sample):</p>
        <ul className="list-disc ml-5 text-gray-700 space-y-2">
          <li>Top services (by bookings)</li>
          <li>Revenue trends</li>
          <li>Customer retention</li>
        </ul>
      </div>
    </div>
  );
}
