import React from "react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#e7f2ef]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/flagged/photo-1575388716708-a47db4fc37e6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Photographer at work"
            className="rounded-2xl shadow-lg"
          />
          <div className="absolute -bottom-6 -right-6 bg-[#19183b] text-white px-6 py-4 rounded-xl shadow-lg">
            <p className="text-lg font-bold">10+ Years Experience</p>
          </div>
        </div>

        {/* Text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#19183b] mb-4">
            About <span className="text-[#ffb347]">MARAHUYO</span>
          </h2>
          <p className="text-[#19183b]/80 leading-relaxed mb-6">
            MARAHUYO connects you with professional photographers who capture
            life’s unforgettable moments — weddings, birthdays, corporate events,
            and more. We make booking easy, so you can focus on celebrating while
            we capture the story.
          </p>
        </div>
      </div>
    </section>
  );
}
