// src/USERS/UsersApp.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import UsersNavbar from "./components/UsersNavbar";
import ServicesFlow from "./components/ServicesFlow";
import BookingsPage from "./components/BookingsPage";
import AboutPage from "./components/AboutPage";
import FAQPage from "./components/FAQPage";
import ProfilePage from "./components/ProfilePage";
import PaymentPage from "./components/PaymentPage";
import ReceiptPage from "./components/ReceiptPage";

export default function UsersApp() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col">
      <UsersNavbar />

      <main className="flex-1 pt-24 px-4 md:px-8">
        <Routes>
          <Route index element={<ServicesFlow />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="receipt" element={<ReceiptPage />} />
          {/* Catch-all redirect to home inside /users */}
          <Route path="*" element={<Navigate to="." replace />} />
        </Routes>
      </main>
    </div>
  );
}
