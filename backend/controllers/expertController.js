const Expert = require("../models/Expert");

// GET /experts (with pagination + filter)
exports.getExperts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };

    const experts = await Expert.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Expert.countDocuments(filter);

    res.json({
      data: experts,
      total,
      page: Number(page),
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch experts" });
  }
};

// GET /experts/:id
exports.getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) return res.status(404).json({ message: "Expert not found" });
    res.json(expert);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expert" });
  }
};

// POST /experts
exports.createExpert = async (req, res) => {
  try {
    const { name, category, experience, rating } = req.body;

    if (!name || !category || !experience || !rating) {
      return res.status(400).json({ message: "All fields required" });
    }

    const expert = await Expert.create(req.body);
    res.status(201).json(expert);
  } catch (err) {
    res.status(500).json({ message: "Error creating expert" });
  }
};