// src/USERS/components/BookingFormStep.jsx
import React, { useState } from "react";

export default function BookingFormStep({ selection, setSelection, onConfirm }) {
  // initial form mirrors signup fields
  const initial = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    province: "",
    city: "",
  };
  const [form, setForm] = useState({ ...initial, ...selection.form });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    // basic validation
    if (!form.firstName || !form.lastName || !form.email) {
      // use toast at ServicesFlow level, but also local guard
      alert("Please fill First name, Last name and Email");
      return;
    }
    onConfirm(form);
  };

  return (
    <form id="booking-form" onSubmit={submit} className="bg-white rounded-lg p-6 shadow space-y-4">
      <h3 className="text-lg font-semibold text-[#19183b]">Your Details</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#708993] mb-1">First Name</label>
          <input name="firstName" value={form.firstName} onChange={handleChange}
                 className="w-full p-2 border rounded text-[#19183b] focus:ring-2 focus:ring-[#ffb347]" />
        </div>
        <div>
          <label className="block text-sm text-[#708993] mb-1">Middle Name</label>
          <input name="middleName" value={form.middleName} onChange={handleChange}
                 className="w-full p-2 border rounded text-[#19183b] focus:ring-2 focus:ring-[#ffb347]" />
        </div>
        <div>
          <label className="block text-sm text-[#708993] mb-1">Last Name</label>
          <input name="lastName" value={form.lastName} onChange={handleChange}
                 className="w-full p-2 border rounded text-[#19183b] focus:ring-2 focus:ring-[#ffb347]" />
        </div>

        <div>
          <label className="block text-sm text-[#708993] mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange}
                 className="w-full p-2 border rounded text-[#19183b] focus:ring-2 focus:ring-[#ffb347]" />
        </div>

        <div>
          <label className="block text-sm text-[#708993] mb-1">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange}
                 className="w-full p-2 border rounded text-[#19183b] focus:ring-2 focus:ring-[#ffb347]" />
        </div>

        <div>
          <label className="block text-sm text-[#708993] mb-1">Street</label>
          <input name="street" value={form.street} onChange={handleChange}
                 className="w-full p-2 border rounded text-[#19183b] focus:ring-2 focus:ring-[#ffb347]" />
        </div>
        <div>
          <label className="block text-sm text-[#708993] mb-1">Province</label>
          <input name="province" value={form.province} onChange={handleChange}
                 className="w-full p-2 border rounded text-[#19183b] focus:ring-2 focus:ring-[#ffb347]" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-[#708993] mb-1">City</label>
          <input name="city" value={form.city} onChange={handleChange}
                 className="w-full p-2 border rounded text-[#19183b] focus:ring-2 focus:ring-[#ffb347]" />
        </div>
      </div>

      {/* hidden submit used by parent confirm button */}
      <button id="booking-form-submit" type="submit" className="hidden">Submit</button>
    </form>
  );
}
