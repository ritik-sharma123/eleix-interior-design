import { randomUUID } from "crypto";
import Lead from "../models/Lead.js";
import Note from "../models/Note.js";
import { dbState } from "../config/db.js";
import { store } from "../utils/mockStore.js";

const PHONE_RE = /^[0-9+\-\s()]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateLeadInput(body) {
  const errors = [];
  if (!body.name || !body.name.trim()) errors.push("Name is required.");
  if (!body.phone || !PHONE_RE.test(body.phone)) errors.push("A valid phone number is required.");
  if (body.email && !EMAIL_RE.test(body.email)) errors.push("Email address looks invalid.");
  return errors;
}

// ---- Public: create a lead (consultation form / quick callback form) ----
export async function createLead(req, res) {
  const errors = validateLeadInput(req.body);
  if (errors.length) {
    return res.status(400).json({ success: false, message: errors.join(" ") });
  }

  const payload = {
    name: req.body.name.trim(),
    phone: req.body.phone.trim(),
    whatsapp: req.body.whatsapp?.trim() || req.body.phone.trim(),
    email: req.body.email?.trim() || "",
    city: req.body.city?.trim() || "",
    propertyType: req.body.propertyType || undefined,
    service: req.body.service || "",
    budget: req.body.budget || undefined,
    propertyStatus: req.body.propertyStatus || undefined,
    preferredContact: req.body.preferredContact || "Phone",
    message: req.body.message?.trim() || "",
    source: req.body.source || "Website",
    status: "New",
  };

  let lead;
  if (dbState.connected) {
    lead = await Lead.create(payload);
    await Note.create({ lead: lead._id, type: "created", text: "Lead Created", author: "System" });
  } else {
    const id = randomUUID();
    const ts = new Date().toISOString();
    lead = { _id: id, ...payload, assignedTo: "", notes: "", createdAt: ts, updatedAt: ts };
    store.leads.unshift(lead);
    store.notes.push({ _id: randomUUID(), lead: id, type: "created", text: "Lead Created", author: "System", createdAt: ts });
  }

  res.status(201).json({
    success: true,
    message: "Thank you! Our design consultant will contact you shortly.",
    lead,
  });
}

// ---- Protected: list leads with search/filter/sort/pagination ----
export async function getLeads(req, res) {
  const { search = "", status = "", page = 1, limit = 10, sort = "-createdAt" } = req.query;
  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 10, 1);

  if (dbState.connected) {
    const query = {};
    if (status) query.status = status;
    if (search) {
      const re = new RegExp(search, "i");
      query.$or = [{ name: re }, { phone: re }, { email: re }, { city: re }];
    }
    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .sort(sort.replace(",", " "))
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);
    return res.json({ success: true, total, page: pageNum, limit: limitNum, leads });
  }

  let leads = [...store.leads];
  if (status) leads = leads.filter((l) => l.status === status);
  if (search) {
    const s = search.toLowerCase();
    leads = leads.filter(
      (l) =>
        l.name.toLowerCase().includes(s) ||
        l.phone.includes(s) ||
        (l.email || "").toLowerCase().includes(s) ||
        (l.city || "").toLowerCase().includes(s)
    );
  }
  leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const total = leads.length;
  const start = (pageNum - 1) * limitNum;
  const paged = leads.slice(start, start + limitNum);
  res.json({ success: true, total, page: pageNum, limit: limitNum, leads: paged });
}

export async function getLeadById(req, res) {
  const { id } = req.params;
  let lead, notes;
  if (dbState.connected) {
    lead = await Lead.findById(id);
    notes = lead ? await Note.find({ lead: id }).sort("createdAt") : [];
  } else {
    lead = store.leads.find((l) => l._id === id);
    notes = store.notes.filter((n) => n.lead === id).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
  if (!lead) return res.status(404).json({ success: false, message: "Lead not found." });
  res.json({ success: true, lead, timeline: notes });
}

export async function updateLead(req, res) {
  const { id } = req.params;
  const updates = req.body;
  if (dbState.connected) {
    const lead = await Lead.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!lead) return res.status(404).json({ success: false, message: "Lead not found." });
    return res.json({ success: true, lead });
  }
  const lead = store.leads.find((l) => l._id === id);
  if (!lead) return res.status(404).json({ success: false, message: "Lead not found." });
  Object.assign(lead, updates, { updatedAt: new Date().toISOString() });
  res.json({ success: true, lead });
}

export async function deleteLead(req, res) {
  const { id } = req.params;
  if (dbState.connected) {
    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) return res.status(404).json({ success: false, message: "Lead not found." });
    await Note.deleteMany({ lead: id });
    return res.json({ success: true, message: "Lead deleted." });
  }
  const idx = store.leads.findIndex((l) => l._id === id);
  if (idx === -1) return res.status(404).json({ success: false, message: "Lead not found." });
  store.leads.splice(idx, 1);
  res.json({ success: true, message: "Lead deleted." });
}

export async function updateStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) return res.status(400).json({ success: false, message: "Status is required." });

  const noteText = `Status changed to ${status}`;
  if (dbState.connected) {
    const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
    if (!lead) return res.status(404).json({ success: false, message: "Lead not found." });
    await Note.create({ lead: id, type: "status_change", text: noteText, author: req.user?.name || "System" });
    return res.json({ success: true, lead });
  }
  const lead = store.leads.find((l) => l._id === id);
  if (!lead) return res.status(404).json({ success: false, message: "Lead not found." });
  lead.status = status;
  lead.updatedAt = new Date().toISOString();
  store.notes.push({ _id: randomUUID(), lead: id, type: "status_change", text: noteText, author: req.user?.name || "System", createdAt: lead.updatedAt });
  res.json({ success: true, lead });
}

export async function assignLead(req, res) {
  const { id } = req.params;
  const { assignedTo } = req.body;
  const noteText = `Assigned to ${assignedTo || "Unassigned"}`;
  if (dbState.connected) {
    const lead = await Lead.findByIdAndUpdate(id, { assignedTo }, { new: true });
    if (!lead) return res.status(404).json({ success: false, message: "Lead not found." });
    await Note.create({ lead: id, type: "assignment", text: noteText, author: req.user?.name || "System" });
    return res.json({ success: true, lead });
  }
  const lead = store.leads.find((l) => l._id === id);
  if (!lead) return res.status(404).json({ success: false, message: "Lead not found." });
  lead.assignedTo = assignedTo;
  lead.updatedAt = new Date().toISOString();
  store.notes.push({ _id: randomUUID(), lead: id, type: "assignment", text: noteText, author: req.user?.name || "System", createdAt: lead.updatedAt });
  res.json({ success: true, lead });
}

export async function addNote(req, res) {
  const { id } = req.params;
  const { text } = req.body;
  if (!text || !text.trim()) return res.status(400).json({ success: false, message: "Note text is required." });

  if (dbState.connected) {
    const lead = await Lead.findById(id);
    if (!lead) return res.status(404).json({ success: false, message: "Lead not found." });
    const note = await Note.create({ lead: id, type: "note", text: text.trim(), author: req.user?.name || "System" });
    lead.notes = text.trim();
    await lead.save();
    return res.status(201).json({ success: true, note });
  }
  const lead = store.leads.find((l) => l._id === id);
  if (!lead) return res.status(404).json({ success: false, message: "Lead not found." });
  const note = { _id: randomUUID(), lead: id, type: "note", text: text.trim(), author: req.user?.name || "System", createdAt: new Date().toISOString() };
  store.notes.push(note);
  lead.notes = text.trim();
  res.status(201).json({ success: true, note });
}
