// Seeds a handful of demo leads into MongoDB so the dashboard isn't empty
// during a client demo. Run with: npm run seed
import dotenv from "dotenv";
import mongoose from "mongoose";
import Lead from "../models/Lead.js";
import Note from "../models/Note.js";

dotenv.config();

const demoLeads = [
  { name: "Rahul Sharma", phone: "+91 98765 43210", whatsapp: "+91 98765 43210", email: "rahul.sharma@example.com", city: "Jaipur", propertyType: "Home", service: "Home Interior Design", budget: "₹10–20 Lakh", propertyStatus: "Ready Property", preferredContact: "WhatsApp", message: "Looking to redo our 3BHK.", status: "New" },
  { name: "Neha Gupta", phone: "+91 91234 56789", whatsapp: "+91 91234 56789", email: "neha.gupta@example.com", city: "Jaipur", propertyType: "Apartment", service: "Modular Kitchen", budget: "₹5–10 Lakh", propertyStatus: "Under Construction", preferredContact: "Phone", message: "Need a modular kitchen quote.", status: "Contacted", assignedTo: "Priya Menon" },
  { name: "Amit Jain", phone: "+91 99887 66554", whatsapp: "+91 99887 66554", email: "amit.jain@example.com", city: "Udaipur", propertyType: "Office", service: "Office Interior", budget: "₹20–30 Lakh", propertyStatus: "Planning", preferredContact: "Email", message: "New office for 40 people.", status: "Qualified", assignedTo: "Rohan Das" },
  { name: "Priya Verma", phone: "+91 90123 45678", whatsapp: "+91 90123 45678", email: "priya.verma@example.com", city: "Jaipur", propertyType: "Villa", service: "Complete Home Renovation", budget: "₹30 Lakh+", propertyStatus: "Renovation", preferredContact: "WhatsApp", message: "Full villa renovation.", status: "Site Visit", assignedTo: "Priya Menon" },
];

async function run() {
  if (!process.env.MONGO_URI) {
    console.log("No MONGO_URI set — skipping MongoDB lead seed (mock mode has its own demo leads).");
    return;
  }
  await mongoose.connect(process.env.MONGO_URI);

  const count = await Lead.countDocuments();
  if (count > 0) {
    console.log(`Leads collection already has ${count} documents — skipping seed.`);
    process.exit(0);
  }

  for (const data of demoLeads) {
    const lead = await Lead.create(data);
    await Note.create({ lead: lead._id, type: "created", text: "Lead Created", author: "System" });
  }

  console.log(`Seeded ${demoLeads.length} demo leads.`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
