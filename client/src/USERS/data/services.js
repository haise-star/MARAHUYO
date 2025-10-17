// src/USERS/data/services.js
const services = [
    {
      id: "weddings",
      title: "Weddings",
      description: "Timeless storytelling for your wedding day — full coverage.",
      image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1170&auto=format&fit=crop",
      basePrice: 2500,
      addons: [
        { id: "extra-hours", title: "Extra Hours", price: 200 },
        { id: "photo-album", title: "Premium Photo Album", price: 350 },
        { id: "second-photog", title: "Second Photographer", price: 400 },
      ],
    },
    {
      id: "birthdays",
      title: "Birthdays",
      description: "Fun, candid coverage for parties and milestones.",
      image: "https://plus.unsplash.com/premium_photo-1693266697129-4dacef81771d?q=80&w=687&auto=format&fit=crop",
      basePrice: 600,
      addons: [
        { id: "photobooth", title: "Photo Booth", price: 120 },
        { id: "instant-prints", title: "Instant Prints", price: 80 },
      ],
    },
    {
      id: "corporate",
      title: "Corporate Events",
      description: "Professional documentation for conferences, launches, and company events.",
      image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=800&q=80",
      basePrice: 1200,
      addons: [
        { id: "extra-editing", title: "Priority Editing", price: 300 },
        { id: "drone", title: "Drone Coverage", price: 450 },
      ],
    },
    {
      id: "portraits",
      title: "Portraits",
      description: "Personal and professional portrait sessions.",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
      basePrice: 200,
      addons: [{ id: "makeup", title: "Makeup Artist", price: 80 }],
    },
  ];
  
  export default services;
  