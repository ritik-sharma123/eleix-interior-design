import express from "express";
import rateLimit from "express-rate-limit";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  updateStatus,
  assignLead,
  addNote,
} from "../controllers/leadController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Basic rate limiting for public lead submission (spec section 16).
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many submissions. Please try again later." },
});

// Public
router.post("/", submitLimiter, createLead);

// Protected (sales/admin dashboard)
router.get("/", protect, getLeads);
router.get("/:id", protect, getLeadById);
router.put("/:id", protect, updateLead);
router.delete("/:id", protect, deleteLead);
router.patch("/:id/status", protect, updateStatus);
router.patch("/:id/assign", protect, assignLead);
router.post("/:id/notes", protect, addNote);

export default router;
