// src/USERS/components/AboutPage.jsx
import React from "react";

export default function AboutPage() {
  return (
    <section id="about" className="py-20 bg-[#f7fbf9] min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-[#19183b]">About MARAHUYO</h3>
          <p className="text-[#708993] mt-1">We connect you with professional photographers for once-in-a-lifetime events.</p>
        </div>

        {/* Visible container */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <p className="text-[#19183b] leading-relaxed">
            MARAHUYO is built for people who want professional photography for life’s important moments.
            Our curated network of photographers focuses on storytelling, craft, and a reliable booking experience.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#e7f2ef] rounded-lg p-5 shadow-inner">
              <h4 className="font-semibold text-[#19183b]">Mission</h4>
              <p className="text-sm text-[#708993] mt-2">Capture your most meaningful moments with craft and care.</p>
            </div>

            <div className="bg-[#e7f2ef] rounded-lg p-5 shadow-inner">
              <h4 className="font-semibold text-[#19183b]">Vision</h4>
              <p className="text-sm text-[#708993] mt-2">To be the trusted booking platform for lifetime events.</p>
            </div>

            <div className="bg-[#e7f2ef] rounded-lg p-5 shadow-inner">
              <h4 className="font-semibold text-[#19183b]">Values</h4>
              <p className="text-sm text-[#708993] mt-2">Trust · Quality · Human Connection</p>
            </div>
          </div>

          <div className="pt-2 border-t">
            <h5 className="font-semibold text-[#19183b]">How we work</h5>
            <p className="text-sm text-[#708993] mt-2">
              Book a service, select add-ons, propose a date/time and provide your details. We confirm availability and connect you with a professional photographer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
