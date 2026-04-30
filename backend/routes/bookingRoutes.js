const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings,
  updateStatus,
} = require("../controllers/bookingController");

router.post("/", createBooking);
router.get("/", getBookings);
router.patch("/:id/status", updateStatus);

module.exports = router;