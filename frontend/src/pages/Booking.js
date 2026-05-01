import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const Booking = () => {
  const { id } = useParams(); // expertId from URL

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const bookSlot = async () => {
    setError("");
    setSuccess("");

    // 🔥 Frontend validation
    if (!form.name || !form.email || !date || !time) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch(`${API}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expertId: id,        // 🔥 REQUIRED
          name: form.name,
          email: form.email,
          phone: form.phone,
          notes: form.notes,
          date: date,          // 🔥 REQUIRED
          time: time,          // 🔥 REQUIRED
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Booking failed ❌");
      } else {
        setSuccess("Booking successful 🎉");
        setForm({ name: "", email: "", phone: "", notes: "" });
        setDate("");
        setTime("");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book Session</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />

      {/* 🔥 NEW: DATE */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* 🔥 NEW: TIME */}
      <select value={time} onChange={(e) => setTime(e.target.value)}>
        <option value="">Select Time</option>
        <option value="10:00 AM">10:00 AM</option>
        <option value="11:00 AM">11:00 AM</option>
        <option value="12:00 PM">12:00 PM</option>
      </select>

      <textarea
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={bookSlot}>Book Now</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Booking;