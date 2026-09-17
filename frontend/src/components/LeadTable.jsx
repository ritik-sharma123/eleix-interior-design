import React from "react";
import { Phone, MessageCircle, Mail, Copy } from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";

function leadWhatsAppLink(lead) {
  const digits = (lead.whatsapp || lead.phone || "").replace(/[^\d]/g, "");
  const message = `Hi ${lead.name}, this is Eleix Interior Design regarding your enquiry.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function ContactButtons({ lead, onCopy }) {
  return (
    <div className="flex items-center gap-1.5">
      <a href={`tel:${lead.phone}`} title="Call" className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800">
        <Phone size={16} />
      </a>
      <a
        href={leadWhatsAppLink(lead)}
        target="_blank" rel="noopener noreferrer" title="WhatsApp"
        className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-green-600"
      >
        <MessageCircle size={16} />
      </a>
      {lead.email && (
        <a href={`mailto:${lead.email}`} title="Email" className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800">
          <Mail size={16} />
        </a>
      )}
      <button title="Copy phone number" onClick={() => onCopy(lead.phone)} className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800">
        <Copy size={16} />
      </button>
    </div>
  );
}

export default function LeadTable({ leads, onOpen, onCopy }) {
  if (!leads.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center text-sm text-gray-500">
        No leads match your current search or filters.
      </div>
    );
  }

  return (
    <div className="scroll-thin overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">City</th>
            <th className="px-4 py-3">Service</th>
            <th className="px-4 py-3">Budget</th>
            <th className="px-4 py-3">Property</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Assigned</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-gray-50">
              <td className="cursor-pointer px-4 py-3 font-medium text-gray-900" onClick={() => onOpen(lead)}>
                {lead.name}
              </td>
              <td className="px-4 py-3 text-gray-600">{lead.phone}</td>
              <td className="px-4 py-3 text-gray-600">{lead.city || "—"}</td>
              <td className="px-4 py-3 text-gray-600">{lead.service || "—"}</td>
              <td className="px-4 py-3 text-gray-600">{lead.budget || "—"}</td>
              <td className="px-4 py-3 text-gray-600">{lead.propertyType || "—"}</td>
              <td className="px-4 py-3"><StatusBadge status={lead.status} /></td>
              <td className="px-4 py-3 text-gray-500">{new Date(lead.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-3 text-gray-600">{lead.assignedTo || "Unassigned"}</td>
              <td className="px-4 py-3"><ContactButtons lead={lead} onCopy={onCopy} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
