import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { expertId, name, email, date, time } = req.body;

    // validation
    if (!expertId || !name || !email) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const booking = new Booking({
      expertId,
      userName: name,     // ✅ FIX HERE
      userEmail: email,   // ✅ FIX HERE
      date,
      time,
    });

    await booking.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    console.error("❌ BOOKING ERROR:", error);
    res.status(500).json({ message: "Booking failed", error });
  }
};