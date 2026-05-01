import Expert from "../models/Expert.js";

// ADD
export const addExpert = async (req, res) => {
  try {
    console.log("📦 BODY:", req.body);

    const expert = await Expert.create(req.body);

    res.status(201).json(expert);
  } catch (error) {
    console.error("❌ ADD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET
export const getExperts = async (req, res) => {
  try {
    const experts = await Expert.find();
    res.json(experts);
  } catch (error) {
    console.error("❌ FETCH ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};