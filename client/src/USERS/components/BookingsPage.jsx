// src/USERS/components/BookingsPage.jsx
import React from "react";

export default function BookingsPage() {
  // sample/mock bookings — replace with real data later
  const bookings = [
    { id: "B-001", service: "Weddings", date: "2026-06-12", status: "Confirmed", location: "Manila" },
    { id: "B-002", service: "Portraits", date: "2026-02-05", status: "Pending", location: "Cebu" },
  ];

  return (
    <section id="bookings" className="py-20 bg-[#f7fbf9] min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-[#19183b]">Your Bookings</h3>
          <p className="text-[#708993] mt-1">All your booking requests and statuses.</p>
        </div>

        {/* Visible container */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between gap-4 p-4 rounded-lg border hover:shadow-md transition bg-[#e7f2ef]">
                <div>
                  <div className="font-semibold text-[#19183b]">
                    {b.service} <span className="text-sm text-[#708993]">#{b.id}</span>
                  </div>
                  <div className="text-sm text-[#708993]">{b.date} • {b.location}</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-sm ${b.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {b.status}
                  </div>
                  <button className="px-3 py-1 rounded-md bg-white border text-[#19183b] hover:bg-[#f1f5f4]">Details</button>
                </div>
              </div>
            ))}

            {bookings.length === 0 && (
              <div className="p-6 text-center text-[#708993]">No bookings yet. Book a photographer to get started.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
