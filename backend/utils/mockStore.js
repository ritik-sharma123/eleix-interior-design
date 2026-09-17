// In-memory data store used whenever MongoDB isn't configured/reachable.
// Keeps the app fully demoable without a database, per the spec's
// "fallback/mock-data development mode" requirement.
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const now = () => new Date().toISOString();

function makeDemoLeads() {
  const demo = [
    {
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
      whatsapp: "+91 98765 43210",
      email: "rahul.sharma@example.com",
      city: "Jaipur",
      propertyType: "Home",
      service: "Home Interior Design",
      budget: "₹10–20 Lakh",
      propertyStatus: "Ready Property",
      preferredContact: "WhatsApp",
      message: "Looking to redo our 3BHK, especially living room and kitchen.",
      status: "New",
      assignedTo: "",
    },
    {
      name: "Neha Gupta",
      phone: "+91 91234 56789",
      whatsapp: "+91 91234 56789",
      email: "neha.gupta@example.com",
      city: "Jaipur",
      propertyType: "Apartment",
      service: "Modular Kitchen",
      budget: "₹5–10 Lakh",
      propertyStatus: "Under Construction",
      preferredContact: "Phone",
      message: "Need a modular kitchen quote, possession in 2 months.",
      status: "Contacted",
      assignedTo: "Priya Menon",
    },
    {
      name: "Amit Jain",
      phone: "+91 99887 66554",
      whatsapp: "+91 99887 66554",
      email: "amit.jain@example.com",
      city: "Udaipur",
      propertyType: "Office",
      service: "Office Interior",
      budget: "₹20–30 Lakh",
      propertyStatus: "Planning",
      preferredContact: "Email",
      message: "New office for 40 people, want a modern design concept.",
      status: "Qualified",
      assignedTo: "Rohan Das",
    },
    {
      name: "Priya Verma",
      phone: "+91 90123 45678",
      whatsapp: "+91 90123 45678",
      email: "priya.verma@example.com",
      city: "Jaipur",
      propertyType: "Villa",
      service: "Complete Home Renovation",
      budget: "₹30 Lakh+",
      propertyStatus: "Renovation",
      preferredContact: "WhatsApp",
      message: "Full villa renovation, want a site visit scheduled.",
      status: "Site Visit",
      assignedTo: "Priya Menon",
    },
  ];

  return demo.map((d, i) => {
    const id = randomUUID();
    const created = new Date(Date.now() - (demo.length - i) * 86400000).toISOString();
    return { _id: id, ...d, source: "Website", createdAt: created, updatedAt: created };
  });
}

export const store = {
  users: [],
  leads: makeDemoLeads(),
  notes: [],
};

export async function seedMockAdmin({ name, email, password }) {
  const exists = store.users.find((u) => u.email === email);
  if (exists) return exists;
  const hashed = await bcrypt.hash(password, 10);
  const user = { _id: randomUUID(), name, email, password: hashed, role: "admin", createdAt: now() };
  store.users.push(user);
  return user;
}

// Seed a demo admin by default so the mock mode is usable out of the box.
seedMockAdmin({
  name: "Admin User",
  email: "admin@eleixinteriors.com",
  password: "ChangeMe123!",
});

// Give the demo leads a couple of activity-timeline notes.
store.leads.forEach((lead) => {
  store.notes.push({
    _id: randomUUID(),
    lead: lead._id,
    type: "created",
    text: "Lead Created",
    author: "System",
    createdAt: lead.createdAt,
  });
  if (lead.status !== "New") {
    store.notes.push({
      _id: randomUUID(),
      lead: lead._id,
      type: "status_change",
      text: `Status changed to ${lead.status}`,
      author: lead.assignedTo || "System",
      createdAt: now(),
    });
  }
});
