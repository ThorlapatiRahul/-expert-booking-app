import mongoose from "mongoose";

const expertSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    experience: { type: Number, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Expert", expertSchema);