import React, { useState } from "react";
import { Calendar, Plus, Trash2, Edit3 } from "lucide-react";
import { motion } from "framer-motion";

export default function DateTimeManagement() {
  const [dateSlots, setDateSlots] = useState([
    { id: 1, date: "2025-10-20", time: "09:00 AM - 11:00 AM", status: "Available" },
    { id: 2, date: "2025-10-21", time: "01:00 PM - 03:00 PM", status: "Booked" },
  ]);

  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleAddSlot = () => {
    if (!newDate || !newTime) return alert("Please fill all fields.");
    setDateSlots([
      ...dateSlots,
      { id: Date.now(), date: newDate, time: newTime, status: "Available" },
    ]);
    setNewDate("");
    setNewTime("");
  };

  const handleDelete = (id) => {
    setDateSlots(dateSlots.filter((slot) => slot.id !== id));
  };

  const handleEdit = (id) => {
    const slot = dateSlots.find((s) => s.id === id);
    if (!slot) return;
    setEditingId(id);
    setNewDate(slot.date);
    setNewTime(slot.time);
  };

  const handleUpdate = () => {
    setDateSlots(
      dateSlots.map((slot) =>
        slot.id === editingId ? { ...slot, date: newDate, time: newTime } : slot
      )
    );
    setEditingId(null);
    setNewDate("");
    setNewTime("");
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f7f8fa] to-[#eaeef3] text-[#19183b] flex justify-center items-start pt-24 px-4 md:px-8 transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="text-[#ffb347]" size={28} />
          <h1 className="text-2xl font-bold text-[#19183b]">Date & Time Management</h1>
        </div>

        {/* Add New Slot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm text-gray-600 mb-1 font-semibold">Select Date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 text-[#19183b] focus:ring-2 focus:ring-[#ffb347] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1 font-semibold">Time Slot</label>
            <input
              type="text"
              placeholder="e.g., 09:00 AM - 11:00 AM"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 text-[#19183b] placeholder-gray-500 focus:ring-2 focus:ring-[#ffb347] outline-none"
            />
          </div>
          <div className="flex items-end">
            {editingId ? (
              <button
                onClick={handleUpdate}
                className="w-full flex items-center justify-center gap-2 bg-[#19183b] text-white py-3 rounded-md hover:opacity-90 transition"
              >
                <Edit3 size={18} />
                Update Slot
              </button>
            ) : (
              <button
                onClick={handleAddSlot}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#19183b] to-[#ffb347] text-white py-3 rounded-md hover:scale-105 transition"
              >
                <Plus size={18} />
                Add Slot
              </button>
            )}
          </div>
        </div>

        {/* Slots Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#19183b] text-white">
                <th className="py-3 px-4 text-left rounded-tl-md">Date</th>
                <th className="py-3 px-4 text-left">Time Slot</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-right rounded-tr-md">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dateSlots.map((slot) => (
                <tr key={slot.id} className="border-b hover:bg-gray-50 transition text-[#19183b]">
                  <td className="py-3 px-4 font-medium">{slot.date}</td>
                  <td className="py-3 px-4">{slot.time}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        slot.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {slot.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(slot.id)}
                      className="text-[#19183b] hover:text-[#ffb347] transition"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(slot.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {dateSlots.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500">
                    No available slots yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
