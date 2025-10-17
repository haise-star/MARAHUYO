// src/USERS/components/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PasswordModal from "./PasswordModal";

const STORAGE_KEY = "marahuyo_user_profile";

/**
 * ProfilePage
 * - Shows editable profile fields from the sign-up (email readonly)
 * - Save persists to localStorage (placeholder for API)
 * - "Change Password" opens PasswordModal (old-password OR OTP flows)
 */
export default function ProfilePage() {
  const defaultUser = {
    firstName: "C.J.",
    middleName: "A.",
    lastName: "Carl",
    email: "cj@example.com",
    phone: "",
    birthday: "",
    street: "",
    province: "",
    city: "",
    // please replace with hashed password in a real app — this is demo-only
    password: "Password123!",
  };

  const [user, setUser] = useState(defaultUser);
  const [editing, setEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(defaultUser);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((s) => ({ ...s, [name]: value }));
  };

  const handleSave = () => {
    // validate required
    if (!user.firstName || !user.lastName || !user.email) {
      toast.error("Please fill First name, Last name and Email (email is read-only).");
      return;
    }

    // persist locally (replace with API call later)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setEditing(false);
    toast.success("Profile updated.");
  };

  return (
    <section className="py-20 max-w-4xl mx-auto px-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[#19183b]">Your Profile</h2>
            <p className="text-sm text-[#708993] mt-1">Manage your personal details</p>
          </div>

          <div className="flex items-center gap-3">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 rounded-md bg-[#e7f2ef] text-[#19183b] hover:scale-105 transition"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-[#19183b] to-[#ffb347] text-white font-semibold"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    // revert from localStorage (cancel)
                    const saved = localStorage.getItem(STORAGE_KEY);
                    if (saved) setUser(JSON.parse(saved));
                    else setUser(defaultUser);
                    setEditing(false);
                  }}
                  className="px-3 py-2 rounded-md border hover:bg-white"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-[#708993]">First Name</label>
            <input
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              readOnly={!editing}
              className={`w-full p-2 border rounded text-[#19183b] placeholder-gray-400 ${!editing ? "bg-gray-50" : "bg-white"} focus:ring-2 focus:ring-[#ffb347]`}
            />
          </div>

          <div>
            <label className="block text-sm text-[#708993]">Middle Name</label>
            <input
              name="middleName"
              value={user.middleName}
              onChange={handleChange}
              readOnly={!editing}
              className={`w-full p-2 border rounded text-[#19183b] ${!editing ? "bg-gray-50" : "bg-white"} focus:ring-2 focus:ring-[#ffb347]`}
            />
          </div>

          <div>
            <label className="block text-sm text-[#708993]">Last Name</label>
            <input
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              readOnly={!editing}
              className={`w-full p-2 border rounded text-[#19183b] ${!editing ? "bg-gray-50" : "bg-white"} focus:ring-2 focus:ring-[#ffb347]`}
            />
          </div>

          <div>
            <label className="block text-sm text-[#708993]">Email (read-only)</label>
            <input
              name="email"
              value={user.email}
              readOnly
              className="w-full p-2 border rounded text-[#19183b] bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm text-[#708993]">Phone</label>
            <input
              name="phone"
              value={user.phone}
              onChange={handleChange}
              readOnly={!editing}
              className={`w-full p-2 border rounded text-[#19183b] ${!editing ? "bg-gray-50" : "bg-white"} focus:ring-2 focus:ring-[#ffb347]`}
            />
          </div>

          <div>
            <label className="block text-sm text-[#708993]">Birthday</label>
            <input
              type="date"
              name="birthday"
              value={user.birthday}
              onChange={handleChange}
              readOnly={!editing}
              className={`w-full p-2 border rounded text-[#19183b] ${!editing ? "bg-gray-50" : "bg-white"} focus:ring-2 focus:ring-[#ffb347]`}
            />
          </div>

          <div>
            <label className="block text-sm text-[#708993]">Street Address</label>
            <input
              name="street"
              value={user.street}
              onChange={handleChange}
              readOnly={!editing}
              className={`w-full p-2 border rounded text-[#19183b] ${!editing ? "bg-gray-50" : "bg-white"} focus:ring-2 focus:ring-[#ffb347]`}
            />
          </div>

          <div>
            <label className="block text-sm text-[#708993]">Province</label>
            <input
              name="province"
              value={user.province}
              onChange={handleChange}
              readOnly={!editing}
              className={`w-full p-2 border rounded text-[#19183b] ${!editing ? "bg-gray-50" : "bg-white"} focus:ring-2 focus:ring-[#ffb347]`}
            />
          </div>

          <div>
            <label className="block text-sm text-[#708993]">City</label>
            <input
              name="city"
              value={user.city}
              onChange={handleChange}
              readOnly={!editing}
              className={`w-full p-2 border rounded text-[#19183b] ${!editing ? "bg-gray-50" : "bg-white"} focus:ring-2 focus:ring-[#ffb347]`}
            />
          </div>
        </form>

        <div className="mt-6 border-t pt-4 flex items-center justify-between">
          <div className="text-sm text-[#708993]">Security</div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-4 py-2 rounded-md bg-[#e7f2ef] text-[#19183b]"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <PasswordModal
          currentPassword={user.password}
          onClose={() => setShowPasswordModal(false)}
          onPasswordChange={(newPass) => {
            setUser(s => ({ ...s, password: newPass }));
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...user, password: newPass }));
            toast.success("Password updated.");
            setShowPasswordModal(false);
          }}
        />
      )}
    </section>
  );
}
