import React from "react";

export default function LayoutWrapper({ children }) {
  return (
    <section
      className="min-h-screen bg-gradient-to-b from-[#f7f8fa] to-[#eaeef3] text-[#19183b] 
      flex justify-center items-start pt-24 px-4 md:px-8 transition-all duration-300"
    >
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        {children}
      </div>
    </section>
  );
}
