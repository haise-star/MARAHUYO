import React from "react";
import { motion } from "framer-motion";
import { Download, ArrowLeft } from "lucide-react";

export default function ReceiptPage({ bookingData, paymentMethod, onBack }) {
  const isPaid = paymentMethod === "gcash";
  const today = new Date().toLocaleDateString();

  const subtotal = bookingData?.totalPrice || 0;
  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  return (
    <section className="min-h-screen bg-[#f7f8fa] flex justify-center items-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-10 border border-gray-200"
      >
        {/* HEADER */}
        <div className="flex justify-between items-start border-b pb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#19183b]">MARAHUYO</h1>
            <p className="text-sm text-gray-600 mt-1">
              123 Coastal Road, Batangas, PH <br />
              support@marahuyo.ph
            </p>
          </div>

          <div className="text-right">
            <h2 className="text-xl font-bold text-[#19183b] tracking-widest">
              RECEIPT
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Receipt #:</strong>{" "}
              {Math.floor(Math.random() * 900000) + 100000}
              <br />
              <strong>Date:</strong> {today}
            </p>
          </div>
        </div>

        {/* CUSTOMER INFO */}
        <div className="mt-8">
          <h3 className="text-[#19183b] font-semibold mb-1">Billed To</h3>
          <p className="text-gray-700 leading-relaxed">
            {bookingData?.firstName} {bookingData?.middleName} {bookingData?.lastName} <br />
            📧 {bookingData?.email} <br />
            📱 {bookingData?.phone}
          </p>
        </div>

        {/* TABLE */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#19183b] text-white text-left">
                <th className="py-3 px-4 rounded-tl-md font-semibold">QTY</th>
                <th className="py-3 px-4 font-semibold">Description</th>
                <th className="py-3 px-4 font-semibold text-right">Unit Price</th>
                <th className="py-3 px-4 rounded-tr-md font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* Main Service */}
              {bookingData?.service && (
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">{bookingData.service}</td>
                  <td className="py-3 px-4 text-right">
                    ₱{bookingData?.servicePrice?.toFixed(2) || "0.00"}
                  </td>
                  <td className="py-3 px-4 text-right">
                    ₱{bookingData?.servicePrice?.toFixed(2) || "0.00"}
                  </td>
                </tr>
              )}

              {/* Add-ons */}
              {bookingData?.addons?.length > 0 &&
                bookingData.addons.map((addon, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="py-3 px-4">1</td>
                    <td className="py-3 px-4">{addon.name}</td>
                    <td className="py-3 px-4 text-right">
                      ₱{addon.price?.toFixed(2) || "0.00"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      ₱{addon.price?.toFixed(2) || "0.00"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* SUMMARY */}
        <div className="flex justify-end mt-6">
          <div className="w-64 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-[#19183b]">₱{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service Fee (5%)</span>
              <span className="text-[#19183b]">₱{serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-[#19183b] border-t pt-2">
              <span>Total (PHP)</span>
              <span className="text-[#ffb347]">₱{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* NOTES */}
        <div className="mt-8 border-t pt-4 text-sm text-gray-700">
          <p>
            <strong>Payment Method:</strong>{" "}
            <span className="text-[#19183b]">
              {isPaid ? "GCash QR" : "Cash on Delivery (COD)"}
            </span>
          </p>
          <p className="mt-2 italic text-gray-600">
            Thank you for choosing <strong>MARAHUYO</strong>! We hope to serve you again.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-[#19183b] to-[#ffb347] text-white font-medium hover:scale-105 transition"
          >
            <Download className="inline-block mr-2 w-4 h-4" />
            Download PDF
          </button>
        </div>
      </motion.div>
    </section>
  );
}
