import Expert from "../models/Expert.js";

// ADD EXPERT
export const addExpert = async (req, res) => {
  try {
    console.log("BODY:", req.body); // DEBUG

    const { name, category, experience, rating } = req.body;

    if (!name || !category) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const expert = new Expert({
      name,
      category,
      experience,
      rating,
    });

    await expert.save();

    console.log("✅ SAVED:", expert);

    res.status(201).json(expert);
  } catch (err) {
    console.error("❌ ADD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET EXPERTS
export const getExperts = async (req, res) => {
  try {
    const experts = await Expert.find();
    console.log("📦 EXPERTS:", experts);

    res.json(experts);
  } catch (err) {
    console.error("❌ GET ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};