import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";

export default function Navbar({ onNav }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#19183b] text-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo with circle image + MARAHUYO text */}
        <div className="flex items-center space-x-3">
          <ScrollLink
            to="home"
            smooth={true}
            duration={600}
            offset={-70}
            className="cursor-pointer"
          >
            <img
              src="/logo192.png" // 🔑 replace with your logo inside public/
              alt="logo"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#ffb347]"
            />
          </ScrollLink>
          <ScrollLink
            to="home"
            smooth={true}
            duration={600}
            offset={-70}
            className="text-2xl font-bold hover:text-[#ffb347] transition cursor-pointer"
          >
            MARAHUYO
          </ScrollLink>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          <ScrollLink to="home" smooth={true} duration={600} offset={-70} className="cursor-pointer hover:text-[#ffb347] transition">Home</ScrollLink>
          <ScrollLink to="about" smooth={true} duration={600} offset={-70} className="cursor-pointer hover:text-[#ffb347] transition">About</ScrollLink>
          <ScrollLink to="services" smooth={true} duration={600} offset={-70} className="cursor-pointer hover:text-[#ffb347] transition">Services</ScrollLink>
          <ScrollLink to="faq" smooth={true} duration={600} offset={-70} className="cursor-pointer hover:text-[#ffb347] transition">FAQ</ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={600} offset={-70} className="cursor-pointer hover:text-[#ffb347] transition">Contact</ScrollLink>

          {/* Auth Buttons */}
          <button onClick={onNav.Login} className="px-4 py-2 rounded-full border border-white hover:bg-white hover:text-[#19183b] transition">Login</button>
          <button onClick={onNav["Sign-Up"]} className="px-4 py-2 rounded-full bg-gradient-to-r from-[#19183b] to-[#ffb347] text-white shadow hover:scale-105 transition">Sign-Up</button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#19183b] px-6 pb-6 space-y-4">
          <ScrollLink onClick={() => setIsOpen(false)} to="home" smooth={true} duration={600} offset={-70} className="block cursor-pointer hover:text-[#ffb347] transition">Home</ScrollLink>
          <ScrollLink onClick={() => setIsOpen(false)} to="about" smooth={true} duration={600} offset={-70} className="block cursor-pointer hover:text-[#ffb347] transition">About</ScrollLink>
          <ScrollLink onClick={() => setIsOpen(false)} to="services" smooth={true} duration={600} offset={-70} className="block cursor-pointer hover:text-[#ffb347] transition">Services</ScrollLink>
          <ScrollLink onClick={() => setIsOpen(false)} to="faq" smooth={true} duration={600} offset={-70} className="block cursor-pointer hover:text-[#ffb347] transition">FAQ</ScrollLink>
          <ScrollLink onClick={() => setIsOpen(false)} to="contact" smooth={true} duration={600} offset={-70} className="block cursor-pointer hover:text-[#ffb347] transition">Contact</ScrollLink>

          {/* Auth Buttons Mobile */}
          <button onClick={() => { setIsOpen(false); onNav.Login(); }} className="w-full px-4 py-2 rounded-full border border-white hover:bg-white hover:text-[#19183b] transition">Login</button>
          <button onClick={() => { setIsOpen(false); onNav["Sign-Up"](); }} className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-[#19183b] to-[#ffb347] text-white shadow hover:scale-105 transition">Sign-Up</button>
        </div>
      )}
    </nav>
  );
}
