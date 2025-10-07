import React, { useState } from "react";

const faqs = [
  {
    q: "How do I book a photographer?",
    a: "Simply click 'Book a Photographer', create an account, and choose your package.",
  },
  {
    q: "Can I cancel or reschedule?",
    a: "Yes, cancellations and reschedules are possible as per our booking policy.",
  },
  {
    q: "Do you offer same-day services?",
    a: "For urgent events, contact us directly and we’ll do our best to assist.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-20 bg-[#e7f2ef]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#19183b] mb-4">
          Frequently Asked <span className="text-[#ffb347]">Questions</span>
        </h2>
        <p className="text-[#708993] mb-12">
          Quick answers to common questions about booking, services, and support.
        </p>

        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === idx ? null : idx)
                }
                className="w-full px-6 py-4 flex justify-between items-center text-[#19183b] font-medium"
              >
                {faq.q}
                <span>{openIndex === idx ? "-" : "+"}</span>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-4 text-[#708993]">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
