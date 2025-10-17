import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function OTPModal({ onClose, onVerify }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (value, idx) => {
    if (/^[0-9]?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[idx] = value;
      setOtp(updatedOtp);

      // Move to next field automatically
      if (value && idx < 5) {
        inputRefs.current[idx + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }
    toast.success("OTP Verified Successfully!");
    if (onVerify) onVerify(enteredOtp);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#19183b] mb-2 text-center">
          Enter OTP
        </h2>
        <p className="text-gray-600 text-center mb-6">
          We sent a 6-digit code to your email/phone
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-12 h-12 text-center text-lg font-semibold border rounded focus:ring-2 focus:ring-[#ffb347] text-[#19183b]"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-[#19183b] to-[#ffb347] text-white font-semibold shadow hover:opacity-90"
        >
          Verify OTP
        </button>

        {/* Resend Link */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Didn’t get the code?{" "}
          <button
            onClick={() => toast.info("OTP resent!")}
            className="text-[#19183b] font-semibold hover:underline"
          >
            Resend
          </button>
        </p>
      </motion.div>
    </div>
  );
}
