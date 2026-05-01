import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { expertId, userName, userEmail, date, time } = req.body;

    if (!expertId || !userName || !userEmail || !date || !time) {
      return res.status(400).json({ message: "All fields required" });
    }

    const booking = new Booking({
      expertId,
      userName,
      userEmail,
      date,
      time,
    });

    const saved = await booking.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error("BOOKING ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};