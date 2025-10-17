import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, FileText } from "lucide-react";

export default function PaymentManagement() {
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Dummy payment data
  const payments = [
    {
      id: "PMT001",
      name: "John Dela Cruz",
      email: "john@example.com",
      service: "Full Spa Package",
      amount: 1500,
      method: "GCash",
      date: "2025-10-10",
      status: "Paid",
    },
    {
      id: "PMT002",
      name: "Maria Santos",
      email: "maria@example.com",
      service: "Massage + Aromatherapy",
      amount: 1200,
      method: "COD",
      date: "2025-10-12",
      status: "Pending",
    },
    {
      id: "PMT003",
      name: "Carlos Reyes",
      email: "carlos@example.com",
      service: "Facial Treatment",
      amount: 800,
      method: "GCash",
      date: "2025-10-15",
      status: "Paid",
    },
  ];

  return (
    <section className="min-h-screen bg-[#f7f8fa] p-8">
      <h1 className="text-2xl font-bold text-[#19183b] mb-6">Payment Management</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#19183b] text-white">
            <tr>
              <th className="py-3 px-4">Payment ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Service</th>
              <th className="py-3 px-4">Amount (₱)</th>
              <th className="py-3 px-4">Method</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr
                key={p.id}
                onClick={() => setSelectedPayment(p)}
                className="border-b border-gray-200 hover:bg-[#ffb347]/10 cursor-pointer transition"
              >
                <td className="py-3 px-4 font-medium text-[#19183b]">{p.id}</td>
                <td className="py-3 px-4">{p.name}</td>
                <td className="py-3 px-4">{p.service}</td>
                <td className="py-3 px-4 text-[#19183b] font-semibold">
                  ₱{p.amount.toFixed(2)}
                </td>
                <td className="py-3 px-4">{p.method}</td>
                <td className="py-3 px-4">{p.date}</td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    p.status === "Paid" ? "text-green-600" : "text-orange-500"
                  }`}
                >
                  {p.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPayment && (
        <ReceiptModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </section>
  );
}

/* --------------------------- RECEIPT MODAL --------------------------- */
function ReceiptModal({ payment, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-gray-300 p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-600 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <FileText className="mx-auto text-[#ffb347]" size={40} />
          <h2 className="text-xl font-bold text-[#19183b] mt-2">Payment Receipt</h2>
          <p className="text-gray-500 text-sm">Transaction ID: {payment.id}</p>
        </div>

        <div className="space-y-2 text-gray-700 text-sm">
          <p>
            <strong>Customer:</strong> {payment.name}
          </p>
          <p>
            <strong>Email:</strong> {payment.email}
          </p>
          <p>
            <strong>Service:</strong> {payment.service}
          </p>
          <p>
            <strong>Amount:</strong> ₱{payment.amount.toFixed(2)}
          </p>
          <p>
            <strong>Payment Method:</strong> {payment.method}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`${
                payment.status === "Paid" ? "text-green-600" : "text-orange-500"
              } font-semibold`}
            >
              {payment.status}
            </span>
          </p>
          <p>
            <strong>Date:</strong> {payment.date}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
