import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { expertId, name, email, date, time } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const booking = new Booking({
      expertId,
      userName: name,     // ✅ FIX
      userEmail: email,   // ✅ FIX
      date,
      time,
    });

    const saved = await booking.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ BOOKING ERROR:", err);
    res.status(500).json({ message: "Booking failed" });
  }
};