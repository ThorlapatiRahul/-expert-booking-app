import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import expertRoutes from "./routes/expertRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

// 🔥 VERY IMPORTANT (this was likely missing)
app.use(express.json());

// allow frontend
app.use(cors());

// routes
app.use("/api", expertRoutes);
app.use("/api", bookingRoutes);

// DB connect
mongoose
  .connect(process.env.MONGO_URI || "your_mongodb_url_here")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));