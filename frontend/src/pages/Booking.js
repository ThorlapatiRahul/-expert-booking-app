import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const Booking = () => {
  const { id } = useParams(); // 🔥 expertId from URL

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const [message, setMessage] = useState("");

  const handleBooking = async () => {
    if (!name || !email || !date || !time) {
      setMessage("Please fill all required fields ❌");
      return;
    }

    try {
      const res = await API.post("/bookings", {
        expertId: id, // 🔥 VERY IMPORTANT
        name,
        email,
        phone,
        date,
        time,
        notes,
      });

      setMessage("Booking successful 🎉");

      // reset form
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");
      setNotes("");
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Booking failed ❌");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book Session</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      {/* 🔥 NEW FIELDS */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <br />

      <button onClick={handleBooking}>Book Now</button>

      {/* MESSAGE */}
      {message && (
        <p style={{ color: message.includes("successful") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Booking;