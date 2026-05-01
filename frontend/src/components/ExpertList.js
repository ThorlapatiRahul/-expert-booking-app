import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./ExpertList.css";

const ExpertList = () => {
  const navigate = useNavigate();

  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [name, setName] = useState("");
  const [cat, setCat] = useState("");
  const [exp, setExp] = useState("");
  const [rating, setRating] = useState("");

  const [page, setPage] = useState(1);
  const limit = 3;

  // ✅ FETCH EXPERTS (SAFE)
  const fetchExperts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/experts");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setExperts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load experts ❌");
      setExperts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  // ✅ ADD EXPERT
  const addExpert = async () => {
    if (!name || !cat || !exp || !rating) {
      alert("Fill all fields");
      return;
    }

    try {
      await API.post("/experts", {
        name,
        category: cat,
        experience: Number(exp),
        rating: Number(rating),
      });

      setName("");
      setCat("");
      setExp("");
      setRating("");

      fetchExperts();
    } catch (err) {
      console.error(err);
      alert("Error adding expert ❌");
    }
  };

  // ✅ FILTER SAFE
  const filtered = (experts || []).filter((e) => {
    if (!e || !e.name) return false;

    return (
      e.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || e.category === category)
    );
  });

  // ✅ PAGINATION
  const start = (page - 1) * limit;
  const currentExperts = filtered.slice(start, start + limit);

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  return (
    <div className="container">
      <h1>🚀 Expert Booking App</h1>

      {/* ADD EXPERT */}
      <div className="card">
        <h2>Add Expert</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Category"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        />

        <input
          type="number"
          placeholder="Experience"
          value={exp}
          onChange={(e) => setExp(e.target.value)}
        />

        <input
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button onClick={addExpert}>Add Expert</button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="controls">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="AI">AI</option>
          <option value="Web Dev">Web Dev</option>
          <option value="ML">ML</option>
        </select>
      </div>

      {/* STATUS */}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          {error}
        </p>
      )}

      {/* LIST */}
      <div className="list">
        {!loading && currentExperts.length === 0 && (
          <p style={{ textAlign: "center" }}>No experts found</p>
        )}

        {currentExperts.map((e) => (
          <div
            key={e._id}
            className="expert-card"
            onClick={() => navigate(`/expert/${e._id}`)}
            style={{ cursor: "pointer" }}
          >
            <h3>{e.name}</h3>
            <p>📂 {e.category}</p>
            <p>🧠 {e.experience} years</p>
            <p>⭐ {e.rating}</p>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {filtered.length > limit && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span>Page {page}</span>

          <button
            disabled={start + limit >= filtered.length}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpertList;