// src/USERS/components/UsersNavbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import NotificationBell from "./NotificationBell";
import ProfileMenu from "./ProfileMenu";

export default function UsersNavbar() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (target) => {
    if (target === "profile") navigate("/users/profile");
    if (target === "bookings") navigate("/users/bookings");
    setProfileOpen(false);
  };

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#19183b] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/logo192.png"
            alt="MARAHUYO"
            className="w-10 h-10 rounded-full border-2 border-[#ffb347]"
          />
          <span className="font-semibold text-lg tracking-wide">MARAHUYO</span>
        </div>

        {/* Center Nav Links */}
        <nav
          className={`${
            menuOpen
              ? "absolute top-16 left-0 bg-[#19183b] w-full flex flex-col items-center py-4"
              : "hidden md:flex md:items-center md:gap-6"
          } transition-all`}
        >
          <NavLink to="/" end className={({ isActive }) => `px-2 py-1 ${isActive ? "text-[#ffb347]" : ""}`}>
            Services
          </NavLink>
          <NavLink to="bookings" className={({ isActive }) => `px-2 py-1 ${isActive ? "text-[#ffb347]" : ""}`}>
            Bookings
          </NavLink>
          <NavLink to="about" className={({ isActive }) => `px-2 py-1 ${isActive ? "text-[#ffb347]" : ""}`}>
            About
          </NavLink>
          <NavLink to="faq" className={({ isActive }) => `px-2 py-1 ${isActive ? "text-[#ffb347]" : ""}`}>
            FAQ
          </NavLink>
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <button onClick={() => setNotifOpen((p) => !p)} className="p-2 rounded-full hover:bg-white/10">
            <Bell size={18} />
          </button>
          {notifOpen && (
            <div className="absolute right-16 top-14">
              <NotificationBell onClose={() => setNotifOpen(false)} />
            </div>
          )}

          {/* Profile */}
          <ProfileMenu
            isOpen={profileOpen}
            onToggle={() => setProfileOpen((s) => !s)}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />

          {/* Mobile Menu */}
          <button onClick={() => setMenuOpen((s) => !s)} className="md:hidden p-2">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
