// Creates the first admin user in MongoDB. Run with: npm run seed
// (only does anything useful when MONGO_URI is set and reachable —
// the mock store seeds its own demo admin automatically on boot).
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User.js";

dotenv.config();

async function run() {
  if (!process.env.MONGO_URI) {
    console.log("No MONGO_URI set — skipping MongoDB admin seed (mock mode seeds its own admin).");
    return;
  }
  await mongoose.connect(process.env.MONGO_URI);

  const email = (process.env.SEED_ADMIN_EMAIL || "admin@eleixinteriors.com").toLowerCase();
  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`Admin already exists: ${email}`);
    process.exit(0);
  }

  const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";
  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    name: process.env.SEED_ADMIN_NAME || "Admin User",
    email,
    password: hashed,
    role: "admin",
  });

  console.log(`Admin user created: ${email} / ${password}`);
  console.log("Please log in and change this password immediately.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
