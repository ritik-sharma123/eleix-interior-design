import Lead, { LEAD_STATUS_VALUES } from "../models/Lead.js";
import { dbState } from "../config/db.js";
import { store } from "../utils/mockStore.js";

export async function getStats(req, res) {
  let leads;
  if (dbState.connected) {
    leads = await Lead.find({}, "status");
  } else {
    leads = store.leads;
  }

  const stats = { total: leads.length };
  LEAD_STATUS_VALUES.forEach((s) => {
    stats[s] = leads.filter((l) => l.status === s).length;
  });

  res.json({ success: true, stats, dbMode: dbState.connected ? "mongodb" : "mock" });
}
