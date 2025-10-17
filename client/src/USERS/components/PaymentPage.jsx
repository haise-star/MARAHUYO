import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, QrCode, Truck } from "lucide-react";

export default function PaymentPage({ bookingData, onConfirm }) {
  const [paymentMethod, setPaymentMethod] = useState(null);

  const totalPrice = bookingData?.totalPrice || 0;

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f8f8f5] to-[#e7f2ef] flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl grid md:grid-cols-3 overflow-hidden"
      >
        {/* Left - Summary */}
        <div className="col-span-2 p-8 bg-gradient-to-b from-[#19183b]/95 to-[#19183b]/90 text-white">
          <h2 className="text-3xl font-serif mb-6 text-[#ffb347]">Review Your Booking</h2>
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold text-lg">Service</h3>
              <p className="text-[#e7f2ef]">{bookingData?.service || "—"}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold text-lg">Add-ons</h3>
              <p className="text-[#e7f2ef]">
                {bookingData?.addons?.length ? bookingData.addons.join(", ") : "None"}
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold text-lg">Date & Time</h3>
              <p className="text-[#e7f2ef]">{bookingData?.date || "—"} at {bookingData?.time || "—"}</p>
            </div>
          </div>
        </div>

        {/* Right - Payment Options */}
        <div className="p-8 flex flex-col justify-between bg-[#fafafa]">
          <div>
            <h2 className="text-2xl font-serif text-[#19183b] mb-4">Payment Method</h2>
            <div className="space-y-4">
              {/* GCash */}
              <button
                onClick={() => setPaymentMethod("gcash")}
                className={`w-full flex items-center gap-3 p-4 border rounded-xl transition ${
                  paymentMethod === "gcash"
                    ? "border-[#ffb347] bg-[#fff5e1]"
                    : "border-gray-300 hover:border-[#ffb347]"
                }`}
              >
                <QrCode className="text-[#ffb347]" />
                <span className="font-medium text-[#19183b]">GCash QR</span>
              </button>

              {/* COD */}
              <button
                onClick={() => setPaymentMethod("cod")}
                className={`w-full flex items-center gap-3 p-4 border rounded-xl transition ${
                  paymentMethod === "cod"
                    ? "border-[#ffb347] bg-[#fff5e1]"
                    : "border-gray-300 hover:border-[#ffb347]"
                }`}
              >
                <Truck className="text-[#ffb347]" />
                <span className="font-medium text-[#19183b]">Cash on Delivery (COD)</span>
              </button>
            </div>

            {/* GCash QR Preview */}
            {paymentMethod === "gcash" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-center"
              >
                <p className="text-sm text-[#708993] mb-2">Scan the QR below to pay via GCash</p>
                <img
                  src="/assets/gcash-qr.png"
                  alt="GCash QR"
                  className="w-48 h-48 mx-auto rounded-lg border shadow-md"
                />
              </motion.div>
            )}
          </div>

          {/* Total + Confirm */}
          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between text-lg font-semibold mb-4">
                <span className="text-[#313136]">Total</span>
              <span className="text-[#313136]">₱{totalPrice.toFixed(2)}</span>
            </div>
            <button
              disabled={!paymentMethod}
              onClick={() => onConfirm(paymentMethod)}
              className={`w-full py-3 rounded-xl font-semibold text-white transition ${
                paymentMethod
                  ? "bg-gradient-to-r from-[#19183b] to-[#ffb347] hover:scale-105"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
