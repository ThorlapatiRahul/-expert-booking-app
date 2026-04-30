const Booking = require("../models/Booking");

// ➕ Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { expertId, date, time, name, email } = req.body;

    // validation
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

    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔎 Get Bookings
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
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// 🔄 Update Status
exports.updateStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update booking" });
  }
};