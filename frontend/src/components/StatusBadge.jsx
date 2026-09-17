import React from "react";

const STYLES = {
  New: "bg-blue-50 text-blue-700",
  Contacted: "bg-amber-50 text-amber-700",
  "Follow-up": "bg-orange-50 text-orange-700",
  Qualified: "bg-purple-50 text-purple-700",
  "Site Visit": "bg-cyan-50 text-cyan-700",
  "Proposal Sent": "bg-indigo-50 text-indigo-700",
  Won: "bg-green-50 text-green-700",
  Lost: "bg-red-50 text-red-700",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${STYLES[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}
