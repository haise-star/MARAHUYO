import React from "react";

export default function Hero({ setAuthType }) {
  return (
    <div
      id="home" 
      className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
          alt="event"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#19183b]/80"></div>
      </div>

      {/* Content */}
      <div className="max-w-3xl px-6">
        <h1 className="text-4xl md:text-6xl font-serif text-white drop-shadow-lg">
          Capture Life’s{" "}
          <span className="text-[#ffb347]">Unforgettable Moments</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-[#e7f2ef] drop-shadow">
          Professional photographers, seamless booking, memories that last
          forever.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setAuthType("register")}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#19183b] to-[#ffb347] text-white font-semibold shadow hover:scale-105 transition"
          >
            Book a Photographer
          </button>
          <button
            onClick={() => setAuthType("login")}
            className="px-6 py-3 rounded-full bg-white text-[#19183b] border border-white shadow hover:bg-[#e7f2ef] transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
