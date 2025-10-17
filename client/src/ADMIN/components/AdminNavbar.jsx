// src/ADMIN/components/AdminNavbar.jsx
import React, { useState } from "react";
import { Bell, Menu } from "lucide-react";
import AdminProfileMenu from "./AdminProfileMenu.jsx";
import { useNavigate } from "react-router-dom";


export default function AdminNavbar() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#19183b] text-white shadow">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              // toggle an attribute on body to open the mobile sidebar
              const open = document.body.getAttribute("data-admin-sidebar") === "open";
              document.body.setAttribute("data-admin-sidebar", open ? "closed" : "open");
            }}
            className="md:hidden p-2 rounded hover:bg-white/10 transition"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-sm text-[#e7f2ef]">
          <div className="text-sm font-medium">Admin</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              className="p-2 rounded-full hover:bg-white/10"
              onClick={() => setNotifOpen((s) => !s)}
            >
              <Bell size={18} />
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-[#19183b] rounded shadow p-3">
                <div className="text-sm font-semibold mb-2">Notifications</div>
                <div className="text-xs text-gray-600">No new notifications</div>
              </div>
            )}
          </div>

          <AdminProfileMenu
            isOpen={profileOpen}
            onToggle={() => setProfileOpen((s) => !s)}
            onLogout={() => navigate("/")}
          />
        </div>
      </div>
    </header>
  );
}
