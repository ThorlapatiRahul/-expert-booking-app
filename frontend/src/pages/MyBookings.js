import React, { useState } from "react";
import API from "../services/api";

const MyBookings = () => {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await API.get(`/bookings?email=${email}`);
      setBookings(res.data);

      if (res.data.length === 0) {
        setError("No bookings found");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>📋 My Bookings</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <button onClick={fetchBookings} style={styles.button}>
        {loading ? "Loading..." : "Search"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      <div style={{ marginTop: "20px" }}>
        {bookings.map((b) => (
          <div key={b._id} style={styles.card}>
            <h3>Expert ID: {b.expertId}</h3>
            <p>📅 Date: {b.date}</p>
            <p>⏰ Time: {b.time}</p>
            <p>📞 Phone: {b.phone}</p>

            <p
              style={{
                color:
                  b.status === "Confirmed"
                    ? "green"
                    : b.status === "Completed"
                    ? "blue"
                    : "orange",
                fontWeight: "bold",
              }}
            >
              Status: {b.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;

// ✅ styles
const styles = {
  container: {
    padding: "40px",
    maxWidth: "600px",
    margin: "auto",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    background: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  card: {
    background: "#fff",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};