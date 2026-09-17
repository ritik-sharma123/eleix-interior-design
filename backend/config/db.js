import mongoose from "mongoose";

// Tracks whether we're actually talking to MongoDB or running on the
// in-memory mock store, so controllers can branch cheaply.
export const dbState = { connected: false };

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.warn(
      "[db] No MONGO_URI set — running in MOCK DATA mode. Leads/users will not persist between restarts."
    );
    dbState.connected = false;
    return;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
    dbState.connected = true;
    console.log("[db] Connected to MongoDB");
  } catch (err) {
    console.warn(
      `[db] Could not connect to MongoDB (${err.message}). Falling back to MOCK DATA mode.`
    );
    dbState.connected = false;
  }
}
