import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { dbState } from "../config/db.js";
import { store } from "../utils/mockStore.js";

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  let user;
  if (dbState.connected) {
    user = await User.findOne({ email: email.toLowerCase().trim() });
  } else {
    user = store.users.find((u) => u.email === email.toLowerCase().trim());
  }

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid email or password." });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ success: false, message: "Invalid email or password." });
  }

  const token = generateToken({ id: user._id, role: user.role, name: user.name, email: user.email });

  res.json({
    success: true,
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
}

export async function me(req, res) {
  res.json({ success: true, user: req.user });
}
