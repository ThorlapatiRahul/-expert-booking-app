import Expert from "../models/Expert.js";

// ADD EXPERT
export const addExpert = async (req, res) => {
  try {
    const { name, category, experience, rating } = req.body;

    // validation
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

    res.status(201).json({ message: "Expert added", expert });
  } catch (error) {
    console.error("❌ ADD EXPERT ERROR:", error);
    res.status(500).json({ message: "Error adding expert", error });
  }
};


// GET ALL EXPERTS
export const getExperts = async (req, res) => {
  try {
    const experts = await Expert.find();
    res.json(experts);
  } catch (error) {
    console.error("❌ FETCH EXPERTS ERROR:", error);
    res.status(500).json({ message: "Error fetching experts" });
  }
};