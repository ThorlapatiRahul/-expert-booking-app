import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const slots = ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];

const ExpertDetail = () => {
  const { id } = useParams();

  const [expert, setExpert] = useState(null);
  const [date, setDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    fetchExpert();
  }, []);

  useEffect(() => {
    if (date) fetchBookedSlots();
  }, [date]);

  const fetchExpert = async () => {
    const res = await API.get(`/experts/${id}`);
    setExpert(res.data);
  };

  // 🔥 fetch booked slots for selected date
  const fetchBookedSlots = async () => {
    const res = await API.get(
      `/bookings?expertId=${id}&date=${date}`
    );
    const times = res.data.map((b) => b.time);
    setBookedSlots(times);
  };

  const handleBooking = async () => {
    if (!date || !selectedSlot || !form.name || !form.email) {
      alert("Fill all required fields");
      return;
    }

    try {
      await API.post("/bookings", {
        expertId: id,
        date,
        time: selectedSlot,
        ...form,
      });

      alert("Booking Successful 🎉");
      setSelectedSlot("");
      fetchBookedSlots(); // refresh slots
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  if (!expert) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>{expert.name}</h1>
      <p>📂 {expert.category}</p>
      <p>🧠 {expert.experience} years</p>
      <p>⭐ {expert.rating}</p>

      <h3>Select Date</h3>
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
      />

      <h3>Available Slots</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        {slots.map((s) => {
          const isBooked = bookedSlots.includes(s);
          return (
            <button
              key={s}
              disabled={isBooked}
              onClick={() => setSelectedSlot(s)}
              style={{
                padding: "10px",
                background: isBooked ? "gray" : "#4caf50",
                color: "white",
              }}
            >
              {s}
            </button>
          );
        })}
      </div>

      <h3>Booking Details</h3>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Phone"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <textarea
        placeholder="Notes"
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />

      <br /><br />
      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
};

export default ExpertDetail;