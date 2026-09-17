import mongoose from "mongoose";

const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Follow-up",
  "Qualified",
  "Site Visit",
  "Proposal Sent",
  "Won",
  "Lost",
];

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    whatsapp: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    city: { type: String, trim: true },
    propertyType: {
      type: String,
      enum: ["Home", "Apartment", "Villa", "Office", "Commercial"],
    },
    service: { type: String, trim: true },
    budget: {
      type: String,
      enum: ["Under ₹5 Lakh", "₹5–10 Lakh", "₹10–20 Lakh", "₹20–30 Lakh", "₹30 Lakh+"],
    },
    propertyStatus: {
      type: String,
      enum: ["Planning", "Under Construction", "Ready Property", "Renovation"],
    },
    preferredContact: {
      type: String,
      enum: ["Phone", "WhatsApp", "Email"],
      default: "Phone",
    },
    message: { type: String, trim: true },
    source: { type: String, default: "Website" },
    status: { type: String, enum: LEAD_STATUSES, default: "New" },
    assignedTo: { type: String, default: "" },
    notes: { type: String, default: "" }, // quick-glance latest note
  },
  { timestamps: true }
);

leadSchema.index({ name: "text", phone: "text", email: "text", city: "text" });

export const LEAD_STATUS_VALUES = LEAD_STATUSES;
export default mongoose.model("Lead", leadSchema);
