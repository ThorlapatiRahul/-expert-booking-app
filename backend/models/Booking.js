import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  expertId: { type: mongoose.Schema.Types.ObjectId, ref: "Expert" },
  userName: String,
  userEmail: String,
  date: String,
  time: String,
});

export default mongoose.model("Booking", bookingSchema);