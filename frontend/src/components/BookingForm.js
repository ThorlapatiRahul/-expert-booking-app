import React, { useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";

const BookingForm = () => {
  const { id } = useParams(); // expertId

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const bookSession = async () => {
    try {
      const res = await API.post("/bookings", {
        expertId: id,
        userName: name,
        userEmail: email,
        date,
        time,
      });

      alert("Booking successful ✅");

      setName("");
      setEmail("");
      setDate("");
      setTime("");

    } catch (err) {
      console.error("BOOKING ERROR:", err.response?.data || err.message);
      alert("Booking failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book Session</h2>

      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <br /><br />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <br /><br />

      <button onClick={bookSession}>Book</button>
    </div>
  );
};

export default BookingForm;