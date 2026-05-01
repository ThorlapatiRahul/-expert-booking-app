import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import expertRoutes from "./routes/expertRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

// load env
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api", expertRoutes);
app.use("/api", bookingRoutes);

// DB connect (IMPORTANT)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Mongo Error:", err);
    process.exit(1); // stop app if DB fails
  }
};

// start server ONLY after DB connects
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
};

startServer();