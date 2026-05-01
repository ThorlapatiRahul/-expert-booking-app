import React, { useState } from "react";
import API from "../services/api";

const Home = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [rating, setRating] = useState("");

  const handleAddExpert = async () => {
    try {
      const res = await API.post("/experts", {
        name,
        category,
        experience: Number(experience),
        rating: Number(rating),
      });

      console.log("✅ Added:", res.data);
      alert("Expert added ✅");

      window.location.reload();
    } catch (err) {
      console.error("❌ FRONTEND ERROR:", err.response?.data || err);
      alert("Error adding expert ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚀 Expert Booking App</h1>

      <h2>Add Expert</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        placeholder="Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />

      <input
        placeholder="Rating (1-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAddExpert}>
        Add Expert
      </button>
    </div>
  );
};

export default Home;