import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  CreditCard,
  BarChart3,
  MessageSquare,
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Bookings", icon: ClipboardList, path: "/admin/bookings" },
    { name: "Date & Time", icon: Calendar, path: "/admin/datetime" },
    { name: "Payments", icon: CreditCard, path: "/admin/payments" },
    { name: "Insights", icon: BarChart3, path: "/admin/insights" },
    { name: "Messages", icon: MessageSquare, path: "/admin/messages" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen flex flex-col justify-between transition-all duration-300 ease-in-out z-50 shadow-lg ${
        collapsed ? "w-[4.8rem]" : "w-64"
      }`}
      style={{
        background: "linear-gradient(180deg, #19183b 0%, #242451 100%)",
      }}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        {!collapsed && (
          <h2 className="text-white font-semibold text-sm tracking-wide">
            MARAHUYO Admin
          </h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center justify-center w-9 h-9 rounded-md hover:bg-white/10 transition-all duration-300 ${
            collapsed ? "mx-auto" : "ml-2"
          }`}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/12252/12252578.png"
            alt="Toggle Sidebar"
            className={`w-5 h-5 invert transition-transform duration-300 ${
              collapsed ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {navItems.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all group ${
                isActive
                  ? "bg-[#ffb347]/20 text-[#ffb347]"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`
            }
            title={collapsed ? name : undefined}
          >
            <Icon size={20} />
            {!collapsed && (
              <span className="text-sm font-medium tracking-wide">
                {name}
              </span>
            )}

            {/* Tooltip for collapsed mode */}
            {collapsed && (
              <span className="absolute left-full ml-3 bg-[#19183b] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg transition-opacity duration-300">
                {name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400 select-none">
        {!collapsed ? "© 2025 MARAHUYO" : "©"}
      </div>
    </aside>
  );
}
