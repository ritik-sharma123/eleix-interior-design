import React from "react";

export default function DashboardCard({ label, value, accent = false }) {
  return (
    <div className={`rounded-xl border p-4 ${accent ? "border-bronze/30 bg-bronze/5" : "border-gray-200 bg-white"}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1.5 text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}
