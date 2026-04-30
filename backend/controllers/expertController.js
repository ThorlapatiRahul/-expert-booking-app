const Expert = require("../models/Expert");

exports.getExperts = async (req, res) => {
  const experts = await Expert.find();
  res.json(experts);
};

exports.createExpert = async (req, res) => {
  const expert = new Expert(req.body);
  await expert.save();
  res.json(expert);
};

exports.getExpertById = async (req, res) => {
  const expert = await Expert.findById(req.params.id);
  res.json(expert);
};