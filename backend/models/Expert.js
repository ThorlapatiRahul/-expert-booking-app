const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  name: String,
  category: String,
  experience: Number,
  rating: Number
});

module.exports = mongoose.model("Expert", expertSchema);