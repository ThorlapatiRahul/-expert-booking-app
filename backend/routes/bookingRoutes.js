const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings,
  updateStatus,
} = require("../controllers/bookingController");

// create booking
router.post("/", createBooking);

// get bookings
router.get("/", getBookings);

// update booking status
router.patch("/:id/status", updateStatus);

module.exports = router;