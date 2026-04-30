const Booking = require("../models/Booking");

// POST /bookings
exports.createBooking = async (req, res) => {
  try {
    const { expertId, date, time, name, email } = req.body;

    if (!expertId || !date || !time || !name || !email) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const booking = await Booking.create(req.body);

    res.status(201).json({
      message: "Booking successful 🎉",
      booking,
    });
  } catch (err) {
    // 🔥 Handle duplicate booking
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Slot already booked ❌",
      });
    }

    res.status(500).json({
      message: "Booking failed ❌",
    });
  }
};

// GET /bookings?email=
exports.getBookings = async (req, res) => {
  try {
    const { email, expertId, date } = req.query;

    let filter = {};
    if (email) filter.email = email;
    if (expertId) filter.expertId = expertId;
    if (date) filter.date = date;

    const bookings = await Booking.find(filter).populate(
      "expertId",
      "name category"
    );

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// PATCH /bookings/:id/status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};