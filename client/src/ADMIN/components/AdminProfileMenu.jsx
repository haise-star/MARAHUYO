// src/ADMIN/components/AdminProfileMenu.jsx
import React from "react";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminProfileMenu({ isOpen, onToggle, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
        aria-label="Profile menu"
      >
        <img src="/logo192.png" alt="avatar" className="w-7 h-7 rounded-full" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-[#19183b] rounded shadow p-2">
          <button
            onClick={() => navigate("../components/AdminProfile.jsx")}
            className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded flex items-center gap-2"
          >
            <User size={16} /> Profile
          </button>
          <button
            onClick={() => {
              onLogout && onLogout();
            }}
            className="w-full text-left px-2 py-2 hover:bg-gray-100 rounded flex items-center gap-2"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
