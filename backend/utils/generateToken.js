import jwt from "jsonwebtoken";

export function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || "dev_secret_change_me", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}
