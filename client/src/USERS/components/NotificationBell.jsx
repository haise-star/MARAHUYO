// src/USERS/components/NotificationBell.jsx
import React from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

export default function NotificationBell({ onClose }) {
  // sample notifications
  const notifs = [
    { id: 1, title: "Booking Confirmed", body: "Your wedding photographer is confirmed — June 12." },
    { id: 2, title: "Message", body: "John (Photographer) sent a message." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-80 bg-white text-[#19183b] rounded-lg shadow-lg ring-1 ring-black/5 overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <Bell size={16} />
          <div className="font-medium">Notifications</div>
        </div>
        <button onClick={onClose} className="text-sm text-[#708993]">Close</button>
      </div>

      <div className="max-h-56 overflow-y-auto">
        {notifs.map((n) => (
          <div key={n.id} className="px-4 py-3 border-b last:border-b-0 hover:bg-[#e7f2ef]">
            <div className="font-semibold text-sm">{n.title}</div>
            <div className="text-xs text-[#708993]">{n.body}</div>
          </div>
        ))}
        {notifs.length === 0 && (
          <div className="p-4 text-sm text-[#708993]">No notifications</div>
        )}
      </div>
    </motion.div>
  );
}
