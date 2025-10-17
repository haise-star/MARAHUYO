import React from "react";

export default function ServiceSelect({ services, selection, setSelection }) {
  const toggleServiceSelect = (service) => {
    if (selection.serviceId === service.id) {
      setSelection({ ...selection, serviceId: null, addons: [] });
    } else {
      setSelection({ ...selection, serviceId: service.id, addons: [] });
    }
  };

  const toggleAddon = (e, addonId) => {
    e.stopPropagation();
    const cur = selection.addons || [];
    if (cur.includes(addonId)) {
      setSelection({ ...selection, addons: cur.filter((a) => a !== addonId) });
    } else {
      setSelection({ ...selection, addons: [...cur, addonId] });
    }
  };

  const onCardKeyDown = (e, service) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleServiceSelect(service);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {services.map((s) => {
        const selected = selection.serviceId === s.id;
        return (
          <div
            key={s.id}
            role="button"
            tabIndex={0}
            onClick={() => toggleServiceSelect(s)}
            onKeyDown={(e) => onCardKeyDown(e, s)}
            className={`rounded-xl overflow-hidden shadow ${selected ? "ring-4 ring-[#ffb347]/30" : ""} bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ffb347]/30`}
            aria-pressed={selected}
          >
            <div className="h-40 overflow-hidden">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-[#19183b]">{s.title}</h3>
                  <p className="text-sm text-[#708993]">{s.description}</p>
                </div>
                <div className="text-sm font-medium text-[#19183b]">${s.basePrice}</div>
              </div>

              {selected && (
                <div className="mt-4 border-t pt-3">
                  <div className="text-sm font-medium text-[#19183b] mb-2">Add-ons</div>
                  <div className="space-y-2">
                    {s.addons.map((a) => (
                      <label
                        key={a.id}
                        className="flex items-center justify-between bg-[#f8faf8] p-2 rounded"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div>
                          <div className="text-sm font-medium text-[#19183b]">{a.title}</div>
                          <div className="text-xs text-[#708993]">${a.price}</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={(selection.addons || []).includes(a.id)}
                          onChange={(e) => toggleAddon(e, a.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4"
                          aria-label={`Toggle ${a.title}`}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${selected ? "bg-[#19183b] text-white" : "bg-[#e7f2ef] text-[#19183b]"}`}>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
