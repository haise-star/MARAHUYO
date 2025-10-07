// src/components/AuthModal.jsx
import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function AuthModal({ type, onClose, onRegisterSuccess }) {
  const [authType, setAuthType] = useState(type);
  const [step, setStep] = useState(authType === "register" ? 0 : 1);
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    street: "",
    province: "",
    city: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);

  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["#ef4444", "#f59e0b", "#3b82f6", "#22c55e"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") {
      let score = 0;
      if (value.length > 5) score++;
      if (/[A-Z]/.test(value)) score++;
      if (/[0-9]/.test(value)) score++;
      if (/[^A-Za-z0-9]/.test(value)) score++;
      setStrength(score);
    }
  };

  const handleNext = () => {
    if (authType === "register") {
      if (step === 0) {
        setStep(1);
        return;
      }
      if (step === 1) {
        if (!form.firstName || !form.lastName || !form.email || !form.password) {
          toast.error("⚠️ Please fill all required fields before continuing.");
          return;
        }
        setStep(2);
      } else if (step === 2) {
        if (!form.phone || !form.birthday || !form.street || !form.province || !form.city) {
          toast.error("⚠️ Please fill all required fields before submitting.");
          return;
        }
        toast.success("🎉 Account created successfully!");

        // ✅ trigger OTP flow instead of only closing
        if (onRegisterSuccess) {
          onRegisterSuccess();
        } else {
          onClose();
        }
      }
    } else {
      if (!form.email || !form.password) {
        toast.error("⚠️ Please enter both email and password.");
        return;
      }
      toast.success("✅ Logged in successfully!");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl flex overflow-hidden"
      >
        {/* Left Side (Image / Branding) */}
        <div className="hidden md:flex w-1/2 bg-[#19183b] text-white items-center justify-center p-6">
          <h2 className="text-3xl font-bold">
            {authType === "login" ? "Welcome Back!" : "Join MARAHUYO"}
          </h2>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-bold text-[#19183b] mb-4">
            {authType === "login" ? "Login to Your Account" : "Create an Account"}
          </h2>

          {/* Progress Bar for Sign Up */}
          {authType === "register" && (
            <div className="flex items-center justify-between mb-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 mx-1 rounded ${
                    i <= step ? "bg-[#ffb347]" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          )}

          {/* Step Content */}
          <div className="space-y-4">
            {/* LOGIN */}
            {authType === "login" && (
              <>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded text-[#19183b] placeholder-gray-400 focus:ring-2 focus:ring-[#ffb347]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full p-2 border rounded text-[#19183b] placeholder-gray-400 focus:ring-2 focus:ring-[#ffb347]"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* TERMS & SERVICES */}
            {authType === "register" && step === 0 && (
  <div className="text-sm text-gray-700 space-y-3 max-h-64 overflow-y-auto p-4 border rounded-lg shadow-inner">
    <h3 className="text-lg font-semibold text-[#19183b] mb-2">Terms & Services</h3>
    <p>
      Welcome to <strong>MARAHUYO</strong>, your trusted booking platform for seamless reservations and experiences. By creating an account, accessing, or using our services, you agree to comply with and be bound by these Terms and Services ("Terms"). If you do not agree to these Terms, please do not use our platform. These Terms form a legally binding agreement between you and MARAHUYO.
    </p>
    <h4 className="font-semibold text-[#19183b] mt-4">1. User Accounts and Registration</h4>
    <p>
      To use certain features of our platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for any activities or actions that occur under your account. MARAHUYO reserves the right to suspend or terminate your account if any information provided is inaccurate or if you violate these Terms.
    </p>
    <h4 className="font-semibold text-[#19183b] mt-4">2. Booking Process</h4>
    <p>
      All bookings made through MARAHUYO are subject to availability and confirmation by the service provider (e.g., hotels, tours, or events). We act as an intermediary and do not guarantee the availability of any booking until confirmed. You agree to provide all necessary details for the booking, including payment information. Once a booking is confirmed, it is your responsibility to review and adhere to any specific terms provided by the service provider.
    </p>
    <h4 className="font-semibold text-[#19183b] mt-4">3. Payments, Cancellations, and Refunds</h4>
    <p>
      Payments for bookings must be made through our secure payment gateway. You agree to pay all fees and charges associated with your bookings. Cancellations and refunds are governed by our Cancellation Policy and the policies of the service provider. Refunds, if applicable, will be processed in accordance with the original payment method. MARAHUYO is not responsible for any additional fees incurred due to cancellations or changes.
    </p>
    <h4 className="font-semibold text-[#19183b] mt-4">4. User Conduct and Misuse</h4>
    <p>
      You agree not to misuse the platform, including but not limited to: engaging in fraudulent activities, posting false reviews, harassing other users, or attempting to interfere with the platform's functionality. Any misuse may result in immediate suspension or termination of your account, and we may report such activities to relevant authorities if necessary.
    </p>
    <h4 className="font-semibold text-[#19183b] mt-4">5. Privacy and Data Handling</h4>
    <p>
      Your personal data will be collected, used, and protected in accordance with our Privacy Policy. By using MARAHUYO, you consent to the collection and use of your information as described therein. We are committed to handling your data responsibly and securely, but you acknowledge that no system is completely infallible.
    </p>
    <h4 className="font-semibold text-[#19183b] mt-4">6. Intellectual Property</h4>
    <p>
      All content on the MARAHUYO platform, including text, graphics, logos, and software, is the property of MARAHUYO or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
    </p>
    <h4 className="font-semibold text-[#19183b] mt-4">7. Limitation of Liability</h4>
    <p>
      MARAHUYO provides the platform on an "as is" basis and disclaims all warranties, express or implied. We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform, including loss of data or profits. Our total liability shall not exceed the amount paid by you for the specific booking in question.
    </p>
    <h4 className="font-semibold text-[#19183b] mt-4">8. Governing Law and Dispute Resolution</h4>
    <p>
      These Terms shall be governed by the laws of [Your Jurisdiction, e.g., the Republic of the Philippines]. Any disputes arising from these Terms shall be resolved through binding arbitration or in the courts of [Your Jurisdiction].
    </p>
    <h4 className="font-semibold text-[#19183b] mt-4">9. Changes to Terms</h4>
    <p>
      MARAHUYO reserves the right to modify these Terms at any time. We will notify you of significant changes via email or on the platform. Your continued use of the platform after such changes constitutes your acceptance of the updated Terms.
    </p>
    <p className="mt-3">
      By clicking “I Agree & Continue”, you confirm that you have read, understood, and agreed to these Terms & Services, as well as our Privacy Policy and any other applicable policies.
    </p>
  </div>
)}

            {/* REGISTER STEP 1 */}
            {authType === "register" && step === 1 && (
              <>
                {["firstName", "middleName", "lastName", "email"].map((field, i) => (
                  <div key={i}>
                    <label className="block text-gray-700 text-sm font-semibold capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      placeholder={`Enter your ${field}`}
                      className="w-full p-2 border rounded text-[#19183b] placeholder-gray-400 focus:ring-2 focus:ring-[#ffb347]"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full p-2 border rounded text-[#19183b] placeholder-gray-400 focus:ring-2 focus:ring-[#ffb347]"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {form.password && (
                    <div className="mt-1">
                      <div
                        className="h-1 rounded"
                        style={{ background: strengthColors[strength - 1] || "#e5e7eb" }}
                      ></div>
                      <p
                        className="text-xs mt-1"
                        style={{ color: strengthColors[strength - 1] || "#6b7280" }}
                      >
                        {strengthLabels[strength - 1] || "Too Weak"}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* REGISTER STEP 2 */}
            {authType === "register" && step === 2 && (
              <>
                {["phone", "birthday", "street", "province", "city"].map((field, i) => (
                  <div key={i}>
                    <label className="block text-gray-700 text-sm font-semibold capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type={field === "birthday" ? "date" : "text"}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      placeholder={`Enter your ${field}`}
                      className="w-full p-2 border rounded text-[#19183b] placeholder-gray-400 focus:ring-2 focus:ring-[#ffb347]"
                    />
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6">
            <button
              onClick={handleNext}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-[#19183b] to-[#ffb347] text-white font-semibold shadow hover:opacity-90"
            >
              {authType === "login"
                ? "Login"
                : step === 2
                ? "Register"
                : step === 0
                ? "I Agree & Continue"
                : "Next"}
            </button>

            <p className="mt-3 text-sm text-gray-600 text-center">
              {authType === "login" ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={() => {
                      setAuthType("register");
                      setStep(0);
                    }}
                    className="text-[#19183b] font-semibold hover:underline"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setAuthType("login");
                      setStep(1);
                    }}
                    className="text-[#19183b] font-semibold hover:underline"
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
