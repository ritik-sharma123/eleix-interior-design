import React, { useState } from "react";
import Modal from "./Modal.jsx";
import { api } from "../services/api.js";

const SERVICES = [
  "Home Interior Design", "Living Room Interior", "Bedroom Interior", "Modular Kitchen",
  "Bathroom Interior", "Office Interior", "Commercial Interior", "Complete Home Renovation",
];

export default function QuickCallbackModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", service: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !/^[0-9+\-\s()]{7,20}$/.test(form.phone)) {
      setError("Please enter your name and a valid phone number.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await api.submitLead({ ...form, source: "Get a Callback" });
      setDone(true);
      setForm({ name: "", phone: "", service: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleClose() {
    setDone(false);
    setError("");
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title={done ? undefined : "Get a Callback"}>
      {done ? (
        <div className="text-center">
          <h3 className="text-xl text-charcoal">Thank you!</h3>
          <p className="mt-2 text-sm text-charcoal/70">Our design consultant will contact you shortly.</p>
          <button onClick={handleClose} className="mt-5 rounded-full bg-charcoal px-6 py-2.5 text-sm text-offwhite">
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <input
            className="w-full rounded-lg border border-sand bg-white px-3.5 py-2.5 text-sm outline-none focus:border-bronze focus:ring-1 focus:ring-bronze"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <input
            className="w-full rounded-lg border border-sand bg-white px-3.5 py-2.5 text-sm outline-none focus:border-bronze focus:ring-1 focus:ring-bronze"
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
          <select
            className="w-full rounded-lg border border-sand bg-white px-3.5 py-2.5 text-sm outline-none focus:border-bronze focus:ring-1 focus:ring-bronze"
            value={form.service}
            onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
          >
            <option value="">Service (optional)</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-charcoal py-3 text-sm font-medium text-offwhite disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Request Callback"}
          </button>
        </form>
      )}
    </Modal>
  );
}
