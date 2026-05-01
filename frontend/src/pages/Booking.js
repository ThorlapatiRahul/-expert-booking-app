import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const Booking = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const book = async () => {
    try {
      await API.post("/bookings", {
        expertId: id,
        name,
        email,
        date: "2026-01-01",
        time: "10:00",
      });

      alert("Booking success");
    } catch (err) {
      alert("Booking failed");
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
      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <button onClick={book}>Book</button>
    </div>
  );
};

export default Booking;