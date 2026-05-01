import Expert from "../models/Expert.js";

// GET ALL
export const getExperts = async (req, res) => {
  try {
    const experts = await Expert.find().sort({ createdAt: -1 });
    res.json(experts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
export const createExpert = async (req, res) => {
  try {
    const { name, category, experience, rating } = req.body;

    if (!name || !category || !experience || !rating) {
      return res.status(400).json({ message: "All fields required" });
    }

    const expert = new Expert({
      name,
      category,
      experience,
      rating,
    });

    const saved = await expert.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};