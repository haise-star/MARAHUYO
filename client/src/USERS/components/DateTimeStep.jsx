// src/USERS/components/DateTimeStep.jsx
import React from "react";

export default function DateTimeStep({ selection, setSelection }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h3 className="text-lg font-semibold text-[#19183b] mb-4">Choose Date & Time</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#708993] mb-1">Preferred Date</label>
          <input
            type="date"
            value={selection.date || ""}
            onChange={(e) => setSelection({ ...selection, date: e.target.value })}
            className="w-full p-2 border rounded text-[#19183b] placeholder-gray-400 focus:ring-2 focus:ring-[#ffb347]"
          />
        </div>

        <div>
          <label className="block text-sm text-[#708993] mb-1">Preferred Time</label>
          <input
            type="time"
            value={selection.time || ""}
            onChange={(e) => setSelection({ ...selection, time: e.target.value })}
            className="w-full p-2 border rounded text-[#19183b] placeholder-gray-400 focus:ring-2 focus:ring-[#ffb347]"
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-[#708993]">We will do our best to honor requested date and time; a photographer will confirm availability.</p>
    </div>
  );
}
