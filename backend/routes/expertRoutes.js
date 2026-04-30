const router = require("express").Router();
const {
  getExperts,
  createExpert,
  getExpertById
} = require("../controllers/expertController");

router.get("/", getExperts);
router.post("/", createExpert);
router.get("/:id", getExpertById);

module.exports = router;