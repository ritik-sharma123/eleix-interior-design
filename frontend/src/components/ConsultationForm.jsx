import React, { useState } from "react";
import { api } from "../services/api.js";

const PROPERTY_TYPES = ["Home", "Apartment", "Villa", "Office", "Commercial"];
const SERVICES = [
  "Home Interior Design", "Living Room Interior", "Bedroom Interior", "Modular Kitchen",
  "Bathroom Interior", "Office Interior", "Commercial Interior", "Complete Home Renovation",
];
const BUDGETS = ["Under ₹5 Lakh", "₹5–10 Lakh", "₹10–20 Lakh", "₹20–30 Lakh", "₹30 Lakh+"];
const PROPERTY_STATUS = ["Planning", "Under Construction", "Ready Property", "Renovation"];
const CONTACT_METHODS = ["Phone", "WhatsApp", "Email"];

const initialState = {
  name: "", phone: "", whatsapp: "", email: "", city: "",
  propertyType: "", service: "", budget: "", propertyStatus: "",
  preferredContact: "Phone", message: "",
};

function Field({ label, children, required }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-charcoal">
        {label} {required && <span className="text-bronze">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-sand bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition focus:border-bronze focus:ring-1 focus:ring-bronze";

export default function ConsultationForm({ defaultService = "", compact = false, onSuccess }) {
  const [form, setForm] = useState({ ...initialState, service: defaultService });
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const errs = [];
    if (!form.name.trim()) errs.push("Full name is required.");
    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone)) errs.push("Enter a valid phone number.");
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.push("Enter a valid email address.");
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (errs.length) return;

    setSubmitting(true);
    try {
      await api.submitLead({ ...form, source: "Consultation Form" });
      setSubmitted(true);
      setForm(initialState);
      onSuccess?.();
    } catch (err) {
      setErrors([err.message]);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-sand bg-white p-8 text-center">
        <h3 className="text-xl text-charcoal">Thank you!</h3>
        <p className="mt-2 text-sm text-charcoal/70">
          Our design consultant will contact you shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-5 text-sm font-medium text-bronze underline underline-offset-2"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errors.map((e, i) => <p key={i}>{e}</p>)}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" required>
          <input className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" />
        </Field>
        <Field label="Phone Number" required>
          <input className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="WhatsApp Number">
          <input className={inputClass} value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="Same as phone, if applicable" />
        </Field>
        <Field label="Email">
          <input className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="City">
          <input className={inputClass} value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Jaipur" />
        </Field>
        <Field label="Property Type">
          <select className={inputClass} value={form.propertyType} onChange={(e) => update("propertyType", e.target.value)}>
            <option value="">Select property type</option>
            {PROPERTY_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Service Required">
        <select className={inputClass} value={form.service} onChange={(e) => update("service", e.target.value)}>
          <option value="">Select a service</option>
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>

      {!compact && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Approximate Budget">
              <select className={inputClass} value={form.budget} onChange={(e) => update("budget", e.target.value)}>
                <option value="">Select budget range</option>
                {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="Property Status">
              <select className={inputClass} value={form.propertyStatus} onChange={(e) => update("propertyStatus", e.target.value)}>
                <option value="">Select property status</option>
                {PROPERTY_STATUS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Preferred Contact Method">
            <div className="flex gap-4 pt-1">
              {CONTACT_METHODS.map((m) => (
                <label key={m} className="flex items-center gap-1.5 text-sm text-charcoal/80">
                  <input
                    type="radio"
                    name="preferredContact"
                    checked={form.preferredContact === m}
                    onChange={() => update("preferredContact", m)}
                    className="accent-bronze"
                  />
                  {m}
                </label>
              ))}
            </div>
          </Field>

          <Field label="Message / Requirements">
            <textarea
              className={inputClass}
              rows={4}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Tell us a bit about your space and what you're looking for."
            />
          </Field>
        </>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-charcoal py-3.5 text-sm font-medium text-offwhite transition hover:bg-espresso disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Request Free Consultation"}
      </button>
    </form>
  );
}
