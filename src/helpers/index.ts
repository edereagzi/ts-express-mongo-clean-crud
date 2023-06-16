import crypto from "crypto";
import mongoose from "mongoose";

export const connectToDatabase = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error("MongoDB URI not found in environment variables");
  }

  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");
};

export const authentication = (salt: string, password: string): string => {
  const SECRET = process.env.SECRET_KEY || "SOSECRET";

  return crypto.createHmac("sha256", [salt, password].join("/")).update(SECRET).digest("hex");
};

export const random = () => crypto.randomBytes(128).toString("base64");
