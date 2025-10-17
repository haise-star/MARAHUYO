import React, { useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";
import ProfileMenu from "./ProfileMenu";

export default function UsersNavbar() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (target) => {
    if (target === "profile") navigate("/profile");
    else if (target === "history") navigate("/bookings");
    setProfileOpen(false);
  };

  const handleLogout = () => {
    // TODO: clear auth session here
    navigate("/", { replace: true });
    setProfileOpen(false);
  };

  const navLinks = [
    { label: "Services", path: "/" },
    { label: "Bookings", path: "/bookings" },
    { label: "About", path: "/about" },
    { label: "FAQ", path: "/faq" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#19183b] text-white shadow-md">
      <div className="relative max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 z-50">
          <img
            src="/logo192.png"
            alt="MARAHUYO"
            className="w-10 h-10 rounded-full object-cover border-2 border-[#ffb347]"
          />
          <div className="text-xl font-semibold tracking-wide">MARAHUYO</div>
        </div>

        {/* Desktop Nav (Centered) */}
        <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center gap-8">
          {navLinks.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `cursor-pointer font-medium transition ${
                  isActive ? "text-[#ffb347]" : "hover:text-[#ffb347]"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right-side (Notifications + Profile) */}
        <div className="flex items-center gap-4 ml-auto z-50">
          {/* Notification */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen((s) => !s)}
              aria-label="Notifications"
              className="p-2 rounded-full hover:bg-white/10 transition"
            >
              <Bell size={18} />
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2">
                <NotificationBell onClose={() => setNotifOpen(false)} />
              </div>
            )}
          </div>

          {/* Profile */}
          <ProfileMenu
            isOpen={profileOpen}
            onToggle={() => setProfileOpen((s) => !s)}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />

          {/* Burger Menu */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-full left-0 w-full bg-[#19183b] border-t border-white/10 shadow-lg md:hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <nav className="flex flex-col items-center py-4 space-y-4 text-lg font-medium">
            {navLinks.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `w-full text-center py-2 transition ${
                    isActive ? "text-[#ffb347]" : "hover:text-[#ffb347]"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
