// src/ADMIN/data/analyticsData.js

export const servicesAnalytics = [
  { id: 1, title: "Portrait", bookings: 0, revenue: 0 },
  { id: 2, title: "Wedding", bookings: 0, revenue: 0 },
  { id: 3, title: "Event", bookings: 0, revenue: 0 },
  { id: 4, title: "Product", bookings: 0, revenue: 0 },
  { id: 5, title: "Family", bookings: 0, revenue: 0 },
  { id: 6, title: "Outdoor", bookings: 0, revenue: 0 },
];

// Helper to generate random integers
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate last 90 days of data
const generateAnalytics = () => {
  const data = [];
  const services = servicesAnalytics.map(s => s.title);
  const today = new Date();

  for (let i = 0; i < 90; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - (89 - i));
    const dateStr = date.toISOString().split("T")[0];

    services.forEach(service => {
      const bookings = randInt(2, 15);
      const revenue = bookings * randInt(500, 1500); // revenue per booking
      const users = bookings + randInt(0, 5);

      data.push({
        date: dateStr,
        service,
        bookings,
        revenue,
        users,
      });

      // Update service totals for Top Services table
      const serviceObj = servicesAnalytics.find(s => s.title === service);
      serviceObj.bookings += bookings;
      serviceObj.revenue += revenue;
    });
  }

  return data;
};

export const analytics = generateAnalytics();
