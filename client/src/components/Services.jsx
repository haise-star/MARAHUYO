import React from "react";

const services = [
  {
    title: "Weddings",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Capture your big day with timeless wedding photography.",
  },
  {
    title: "Birthdays",
    image:
      "https://plus.unsplash.com/premium_photo-1693266697129-4dacef81771d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Celebrate milestones with vibrant and joyful birthday coverage.",
  },
  {
    title: "Corporate Events",
    image:
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=800&q=80",
    desc: "Professional documentation for conferences, launches, and team events.",
  },
  {
    title: "Portraits",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    desc: "Personal and professional portraits that stand out.",
  },
  {
    title: "Travel",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    desc: "Beautifully captured travel memories for every journey.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#19183b] mb-4">
          Our <span className="text-[#ffb347]">Services</span>
        </h2>
        <p className="text-[#708993] mb-12">
          From intimate gatherings to grand celebrations, we’ve got you covered.
        </p>

        {/* Infinite Scroll Container */}
        <div className="overflow-hidden relative">
          <div className="flex animate-slide gap-8 w-max">
            {[...services, ...services].map((service, idx) => (
              <div
                key={idx}
                className="w-72 flex-shrink-0 rounded-2xl shadow-lg overflow-hidden bg-[#e7f2ef] hover:scale-105 transition"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#19183b] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[#708993] text-sm">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
