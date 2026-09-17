import React from "react";

export default function LoadingSpinner({ label = "Loading" }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-sm text-charcoal/60">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-bronze border-t-transparent" />
      {label}
    </div>
  );
}
