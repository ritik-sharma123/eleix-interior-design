import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children, wide = false }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/50 p-0 md:items-center md:p-6">
      <div
        className={`max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-offwhite p-6 shadow-2xl md:rounded-2xl md:p-8 ${
          wide ? "md:max-w-3xl" : "md:max-w-lg"
        }`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          {title && <h3 className="text-xl font-medium text-charcoal">{title}</h3>}
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-auto rounded-full p-1.5 text-charcoal/60 transition hover:bg-sand hover:text-charcoal"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
