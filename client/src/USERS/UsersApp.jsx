import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import UsersNavbar from "./components/UsersNavbar";
import ServiceSelect from "./components/ServiceSelect";
import BookingsPage from "./components/BookingsPage";
import AboutPage from "./components/AboutPage";
import FAQPage from "./components/FAQPage";
import ProfilePage from "./components/ProfilePage";
import PaymentPage from "./components/PaymentPage";
import ReceiptPage from "./components/ReceiptPage";

// Import your services data
import servicesData from "./data/services";

export default function UsersApp() {
  const [selection, setSelection] = useState({ serviceId: null, addons: [] });

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col">
      <UsersNavbar />

      <main className="flex-1 pt-24 px-4 md:px-8">
        <Routes>
          {/* Default /users shows ServiceSelect directly */}
          <Route
            index
            element={
              <ServiceSelect
                services={servicesData}
                selection={selection}
                setSelection={setSelection}
              />
            }
          />

          {/*routes */}
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="receipt" element={<ReceiptPage />} />
          <Route path="*" element={<Navigate to="users" replace />} />
        </Routes>
      </main>
    </div>
  );
}
