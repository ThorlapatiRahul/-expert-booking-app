import React, { useState } from "react";
import API from "../services/api";

const Booking = ({ expertId, selectedDate, selectedSlot }) => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const bookSlot = async () => {
    try {
      setLoading(true);

      await API.post("/bookings", {
        expertId,
        date: selectedDate,
        time: selectedSlot,
        ...form,
      });

      setMessage("Booking successful 🎉");
      setError("");
    } catch (err) {
      setError("Booking failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h2>Book Session</h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        style={styles.input}
      />

      <textarea
        name="notes"
        placeholder="Notes"
        onChange={handleChange}
        style={styles.textarea}
      />

      {error && <p style={styles.error}>{error}</p>}
      {message && <p style={styles.success}>{message}</p>}

      <button onClick={bookSlot} style={styles.button}>
        {loading ? "Booking..." : "Book Now"}
      </button>
    </div>
  );
};

export default Booking;


// 🔥 ADD HERE (bottom of file)
const styles = {
  card: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.9)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
  input: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    margin: "10px 0",
  },
  button: {
    background: "#ff6b6b",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  success: {
    color: "green",
    marginTop: "10px",
  },
};