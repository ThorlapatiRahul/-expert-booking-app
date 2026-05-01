import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import expertRoutes from "./routes/expertRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api", expertRoutes);
app.use("/api", bookingRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// 🔥 FIXED START
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on ${PORT}`)
    );
  } catch (err) {
    console.log("❌ Mongo Error:", err);
  }
};

startServer();