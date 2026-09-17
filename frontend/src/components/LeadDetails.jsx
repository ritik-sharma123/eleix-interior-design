import React, { useEffect, useState } from "react";
import { Phone, MessageCircle, Mail, Copy, Clock } from "lucide-react";
import Modal from "./Modal.jsx";
import StatusBadge from "./StatusBadge.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import { api } from "../services/api.js";

const STATUSES = ["New", "Contacted", "Follow-up", "Qualified", "Site Visit", "Proposal Sent", "Won", "Lost"];

function leadWhatsAppLink(lead) {
  const digits = (lead.whatsapp || lead.phone || "").replace(/[^\d]/g, "");
  const message = `Hi ${lead.name}, this is Eleix Interior Design regarding your enquiry.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export default function LeadDetails({ leadId, open, onClose, onChanged, onToast }) {
  const [lead, setLead] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    if (!open || !leadId) return;
    setLoading(true);
    api.getLead(leadId).then((data) => {
      setLead(data.lead);
      setTimeline(data.timeline || []);
      setAssignedTo(data.lead.assignedTo || "");
      setLoading(false);
    }).catch((err) => {
      onToast?.({ type: "error", message: err.message });
      setLoading(false);
    });
  }, [open, leadId]);

  async function handleStatusChange(status) {
    try {
      const data = await api.updateLeadStatus(leadId, status);
      setLead(data.lead);
      onChanged?.();
      onToast?.({ type: "success", message: `Status updated to ${status}.` });
      const t = await api.getLead(leadId);
      setTimeline(t.timeline || []);
    } catch (err) {
      onToast?.({ type: "error", message: err.message });
    }
  }

  async function handleAssign() {
    try {
      const data = await api.assignLead(leadId, assignedTo);
      setLead(data.lead);
      onChanged?.();
      onToast?.({ type: "success", message: "Salesperson assigned." });
      const t = await api.getLead(leadId);
      setTimeline(t.timeline || []);
    } catch (err) {
      onToast?.({ type: "error", message: err.message });
    }
  }

  async function handleAddNote(e) {
    e.preventDefault();
    if (!noteText.trim()) return;
    setSavingNote(true);
    try {
      await api.addNote(leadId, noteText.trim());
      setNoteText("");
      const t = await api.getLead(leadId);
      setTimeline(t.timeline || []);
      onToast?.({ type: "success", message: "Note added." });
    } catch (err) {
      onToast?.({ type: "error", message: err.message });
    } finally {
      setSavingNote(false);
    }
  }

  function copyPhone() {
    if (!lead) return;
    navigator.clipboard.writeText(lead.phone);
    onToast?.({ type: "success", message: "Phone number copied." });
  }

  return (
    <Modal open={open} onClose={onClose} title={lead ? lead.name : "Lead Details"} wide>
      {loading || !lead ? (
        <LoadingSpinner label="Loading lead..." />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3.5 py-2 text-sm text-gray-700 hover:bg-gray-200">
              <Phone size={15} /> Call
            </a>
            <a href={leadWhatsAppLink(lead)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full bg-green-50 px-3.5 py-2 text-sm text-green-700 hover:bg-green-100">
              <MessageCircle size={15} /> Chat on WhatsApp
            </a>
            {lead.email && (
              <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3.5 py-2 text-sm text-gray-700 hover:bg-gray-200">
                <Mail size={15} /> Email
              </a>
            )}
            <button onClick={copyPhone} className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3.5 py-2 text-sm text-gray-700 hover:bg-gray-200">
              <Copy size={15} /> Copy Number
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Customer Information</h4>
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-gray-500">Phone</dt><dd className="text-gray-800">{lead.phone}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-gray-500">WhatsApp</dt><dd className="text-gray-800">{lead.whatsapp || "—"}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-gray-500">Email</dt><dd className="text-gray-800">{lead.email || "—"}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-gray-500">City</dt><dd className="text-gray-800">{lead.city || "—"}</dd></div>
              </dl>

              <h4 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-gray-500">Project Information</h4>
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-gray-500">Property Type</dt><dd className="text-gray-800">{lead.propertyType || "—"}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-gray-500">Service</dt><dd className="text-gray-800">{lead.service || "—"}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-gray-500">Budget</dt><dd className="text-gray-800">{lead.budget || "—"}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-gray-500">Property Status</dt><dd className="text-gray-800">{lead.propertyStatus || "—"}</dd></div>
              </dl>
              {lead.message && (
                <>
                  <h4 className="mb-1 mt-5 text-xs font-semibold uppercase tracking-wide text-gray-500">Requirements</h4>
                  <p className="text-sm text-gray-700">{lead.message}</p>
                </>
              )}
            </div>

            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Lead Information</h4>
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-gray-500">Created</dt><dd className="text-gray-800">{new Date(lead.createdAt).toLocaleString()}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-gray-500">Source</dt><dd className="text-gray-800">{lead.source}</dd></div>
                <div className="flex items-center justify-between gap-4"><dt className="text-gray-500">Status</dt><dd><StatusBadge status={lead.status} /></dd></div>
              </dl>

              <label className="mt-4 block text-xs font-medium text-gray-500">Change Status</label>
              <select
                value={lead.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-bronze focus:ring-1 focus:ring-bronze"
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>

              <label className="mt-4 block text-xs font-medium text-gray-500">Assigned Salesperson</label>
              <div className="mt-1 flex gap-2">
                <input
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="e.g. Priya Menon"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-bronze focus:ring-1 focus:ring-bronze"
                />
                <button onClick={handleAssign} className="whitespace-nowrap rounded-lg bg-gray-900 px-3.5 py-2 text-sm text-white">Save</button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Activity Timeline</h4>
            <ul className="space-y-3 border-l-2 border-gray-100 pl-4">
              {timeline.map((n) => (
                <li key={n._id} className="relative text-sm">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-bronze" />
                  <p className="text-gray-800">{n.text}</p>
                  <p className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={11} /> {new Date(n.createdAt).toLocaleString()} · {n.author}
                  </p>
                </li>
              ))}
            </ul>

            <form onSubmit={handleAddNote} className="mt-4 flex gap-2">
              <input
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add a note about this lead..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-bronze focus:ring-1 focus:ring-bronze"
              />
              <button disabled={savingNote} className="whitespace-nowrap rounded-lg bg-bronze px-4 py-2 text-sm text-white disabled:opacity-60">
                {savingNote ? "Adding..." : "Add Note"}
              </button>
            </form>
          </div>
        </div>
      )}
    </Modal>
  );
}
