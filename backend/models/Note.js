import mongoose from "mongoose";

// A single timeline/activity entry attached to a Lead.
const noteSchema = new mongoose.Schema(
  {
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead", required: true },
    type: {
      type: String,
      enum: ["note", "status_change", "assignment", "created"],
      default: "note",
    },
    text: { type: String, required: true },
    author: { type: String, default: "System" },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
