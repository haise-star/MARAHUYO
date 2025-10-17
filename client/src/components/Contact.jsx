import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#19183b] mb-4">
          Get in <span className="text-[#ffb347]">Touch</span>
        </h2>
        <p className="text-[#708993] mb-12">
          Have questions? We’d love to hear from you. Fill out the form below
          and we’ll get back to you as soon as possible.
        </p>

        <form className="grid gap-6 text-left">
          <input
            type="text"
            placeholder="Your Name"
            className="p-4 border border-gray-300 rounded-lg w-full text-[#19183b] placeholder-gray-500 bg-white focus:ring-2 focus:ring-[#ffb347] focus:border-[#ffb347] outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-4 border border-gray-300 rounded-lg w-full text-[#19183b] placeholder-gray-500 bg-white focus:ring-2 focus:ring-[#ffb347] focus:border-[#ffb347] outline-none"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="p-4 border border-gray-300 rounded-lg w-full text-[#19183b] placeholder-gray-500 bg-white focus:ring-2 focus:ring-[#ffb347] focus:border-[#ffb347] outline-none"
          ></textarea>
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#19183b] to-[#ffb347] text-white font-semibold shadow hover:scale-105 transition-transform"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
