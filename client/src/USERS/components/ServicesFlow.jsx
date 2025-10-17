// src/USERS/components/ServicesFlow.jsx
import React, { useState } from "react";
import servicesData from "../data/services";
import ServiceSelect from "./ServiceSelect";
import DateTimeStep from "./DateTimeStep";
import BookingFormStep from "./BookingFormStep";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ServicesFlow() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState({
    serviceId: null,
    addons: [],
    date: "",
    time: "",
    form: {}
  });

  const selectedService = servicesData.find((s) => s.id === selection.serviceId);

  const goNext = () => {
    if (step === 0 && !selection.serviceId) {
      toast.error("Please choose a service to continue.");
      return;
    }
    if (step === 1 && (!selection.date || !selection.time)) {
      toast.error("Please pick a date and time for your booking.");
      return;
    }
    setStep((s) => s + 1);
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  // compute total price helper
  const computeTotal = (serviceId, addons = []) => {
    const svc = servicesData.find((s) => s.id === serviceId);
    if (!svc) return 0;
    let total = svc.basePrice || 0;
    if (Array.isArray(addons) && svc.addons) {
      addons.forEach((aId) => {
        const addon = svc.addons.find((ad) => ad.id === aId);
        if (addon) total += addon.price;
      });
    }
    return total;
  };

  // When booking form step calls onConfirm, we send payload to Payment page
  const handleConfirm = (formValues) => {
    const payload = {
      serviceId: selection.serviceId,
      service: selectedService,
      addons: selection.addons || [],
      date: selection.date,
      time: selection.time,
      client: formValues,
      totalPrice: computeTotal(selection.serviceId, selection.addons || []),
      createdAt: new Date().toISOString(),
    };

    // Store to sessionStorage as fallback (in case user refreshes payment page)
    try {
      sessionStorage.setItem("marahuyo_last_booking", JSON.stringify(payload));
    } catch (e) {
      // ignore
    }

    // Navigate to payment page and pass payload
    navigate("/payment", { state: { bookingDetails: payload } });
  };

  return (
    <section id="services" className="pt-28 pb-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#19183b] mb-3">Book a <span className="text-[#ffb347]">Photographer</span></h2>
        <p className="text-[#708993] mb-8">Choose a service, pick a date & time, and provide your details.</p>

        <div className="bg-[#e7f2ef] rounded-2xl p-6 shadow">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm text-[#708993]">Step</div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#19183b] text-white text-lg font-semibold" aria-live="polite">
                <span className="leading-none">{step + 1}</span>
                <span className="text-sm text-[#a1c2bd] ml-2">/ 3</span>
              </div>
            </div>

            <div className="text-sm text-[#708993]">Selected: {selectedService ? selectedService.title : "—"}</div>
          </div>

          <div className="min-h-[320px]">
            {step === 0 && (
              <ServiceSelect
                services={servicesData}
                selection={selection}
                setSelection={setSelection}
              />
            )}
            {step === 1 && (
              <DateTimeStep
                selection={selection}
                setSelection={setSelection}
              />
            )}
            {step === 2 && (
              <BookingFormStep
                selection={selection}
                setSelection={setSelection}
                onConfirm={handleConfirm}
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            {step > 0 && (
              <button
                onClick={goBack}
                className="px-4 py-2 rounded-md border border-[#19183b]/40 text-[#19183b] font-semibold hover:bg-white transition"
              >
                Back
              </button>
            )}

            {step < 2 ? (
              <button
                onClick={goNext}
                className="px-6 py-2 rounded-md bg-gradient-to-r from-[#19183b] to-[#ffb347] text-white font-semibold shadow hover:opacity-90"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => document.getElementById("booking-form-submit")?.click()}
                className="px-6 py-2 rounded-md bg-gradient-to-r from-[#19183b] to-[#ffb347] text-white font-semibold shadow hover:opacity-90"
              >
                Continue to Payment
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
