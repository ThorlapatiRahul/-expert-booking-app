const express = require("express");
const router = express.Router();

const {
  getExperts,
  getExpertById,
  createExpert,
} = require("../controllers/expertController");

router.get("/", getExperts);
router.get("/:id", getExpertById);
router.post("/", createExpert);

module.exports = router;