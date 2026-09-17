import React, { useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div
      role="status"
      className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg px-4 py-3 text-sm text-white shadow-lg md:left-auto md:right-8 md:translate-x-0 ${
        isError ? "bg-red-600" : "bg-charcoal"
      }`}
    >
      {isError ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
      {toast.message}
    </div>
  );
}
