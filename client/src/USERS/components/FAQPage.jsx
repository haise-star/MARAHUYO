// src/USERS/components/FAQPage.jsx
import React from "react";

const faqs = [
  { q: "How do I book a photographer?", a: "Choose a service, pick date & time, then fill the booking form. A photographer will confirm availability." },
  { q: "What is your cancellation policy?", a: "Cancellations are subject to provider terms — please check your booking confirmation for details." },
  { q: "Do photographers travel?", a: "Yes — some services include travel fees. Additional fees will be shown during booking." },
];

export default function FAQPage() {
  return (
    <section id="faq" className="py-20 bg-[#f7fbf9] min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-[#19183b]">FAQ</h3>
          <p className="text-[#708993] mt-1">Common questions and answers about booking and services.</p>
        </div>

        {/* Visible container */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="bg-[#e7f2ef] p-4 rounded-lg" >
                <summary className="font-semibold text-[#19183b] cursor-pointer">{f.q}</summary>
                <div className="mt-2 text-[#708993]">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
