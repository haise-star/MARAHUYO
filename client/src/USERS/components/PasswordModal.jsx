// src/USERS/components/PasswordModal.jsx
import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
// OTPModal is in your root components folder (from earlier). Adjust path if your OTPModal live elsewhere.
import OTPModal from "../../components/OTPModal";

/**
 * PasswordModal
 * - Accepts currentPassword (string) for client-side old-password check (simulated)
 * - Allows change by either entering the old password OR verifying via OTP
 * - Calls onPasswordChange(newPassword) on success
 *
 * Note: In production, never store or compare raw passwords on client.
 */
export default function PasswordModal({ currentPassword = "", onClose, onPasswordChange }) {
  const [usingOtp, setUsingOtp] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [strength, setStrength] = useState(0);
  const strengthColors = ["#ef4444", "#f59e0b", "#3b82f6", "#22c55e"];
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

  const checkStrength = (value) => {
    let score = 0;
    if (value.length > 5) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    setStrength(score);
  };

  const handleVerifyOld = () => {
    if (!oldPassword) {
      toast.error("Enter your current password");
      return;
    }
    // Simulated check (replace with API)
    if (oldPassword !== currentPassword) {
      toast.error("Current password is incorrect");
      return;
    }
    // Now check new passwords
    if (!newPassword || newPassword !== confirm) {
      toast.error("New passwords do not match or are empty");
      return;
    }
    if (strength < 2) {
      toast.error("Choose a stronger password");
      return;
    }
    onPasswordChange(newPassword);
  };

  const handleOtpFlow = () => {
    // open OTP modal — when OTPModal calls onVerify, we set otpVerified true
    setOtpOpen(true);
  };

  const handleOtpVerified = (otp) => {
    // in real app verify otp on server; here we assume success
    setOtpOpen(false);
    setOtpVerified(true);
    toast.success("OTP verified — please enter a new password.");
  };

  const handleSetAfterOtp = () => {
    if (!newPassword || newPassword !== confirm) {
      toast.error("New passwords do not match or are empty");
      return;
    }
    if (strength < 2) {
      toast.error("Choose a stronger password");
      return;
    }
    onPasswordChange(newPassword);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
            <X size={20} />
          </button>

          <h3 className="text-xl font-semibold text-[#19183b] mb-2">Update Password</h3>
          <p className="text-sm text-[#708993] mb-4">You can update using your current password or reset via OTP.</p>

          {!otpVerified ? (
            <>
              <div className="grid gap-3">
                <div>
                  <label className="text-sm text-[#708993]">Old Password</label>
                  <div className="relative">
                    <input
                      type={showOld ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full p-2 border rounded text-[#19183b] focus:ring-2 focus:ring-[#ffb347]"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2 text-gray-500"
                      onClick={() => setShowOld((s) => !s)}
                    >
                      {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-[#708993]">New Password</label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        checkStrength(e.target.value);
                      }}
                      className="w-full p-2 border rounded text-[#19183b] focus:ring-2 focus:ring-[#ffb347]"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2 text-gray-500"
                      onClick={() => setShowNew((s) => !s)}
                    >
                      {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {newPassword && (
                    <div className="mt-2">
                      <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
                        <div
                          className={`h-2 rounded transition-all ${
                            strength <= 1 ? "bg-red-500 w-1/4" : strength === 2 ? "bg-yellow-500 w-2/4" : strength === 3 ? "bg-blue-500 w-3/4" : "bg-green-500 w-full"
                          }`}
                        />
                      </div>
                      <p className="text-xs mt-1" style={{ color: strengthColors[strength - 1] || "#6b7280" }}>
                        {strengthLabels[strength - 1] || "Too Weak"}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm text-[#708993]">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full p-2 border rounded text-[#19183b] focus:ring-2 focus:ring-[#ffb347]"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 justify-end">
                <button
                  onClick={handleOtpFlow}
                  className="px-3 py-2 rounded-md bg-[#e7f2ef] text-[#19183b]"
                >
                  Reset via OTP
                </button>
                <button
                  onClick={handleVerifyOld}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-[#19183b] to-[#ffb347] text-white"
                >
                  Update Password
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-sm text-[#708993]">New Password</label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      checkStrength(e.target.value);
                    }}
                    className="w-full p-2 border rounded text-[#19183b] focus:ring-2 focus:ring-[#ffb347]"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-gray-500"
                    onClick={() => setShowNew((s) => !s)}
                  >
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <div className="mt-2">
                  <label className="text-sm text-[#708993]">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full p-2 border rounded text-[#19183b] focus:ring-2 focus:ring-[#ffb347]"
                  />
                </div>

                <div className="mt-4 flex items-center gap-3 justify-end">
                  <button
                    onClick={() => {
                      setOtpVerified(false);
                      setNewPassword("");
                      setConfirm("");
                    }}
                    className="px-3 py-2 rounded-md border hover:bg-white"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSetAfterOtp}
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-[#19183b] to-[#ffb347] text-white"
                  >
                    Set Password
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {otpOpen && <OTPModal onClose={() => setOtpOpen(false)} onVerify={handleOtpVerified} />}
    </>
  );
}
