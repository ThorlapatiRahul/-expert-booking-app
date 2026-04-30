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

  const [currentPage, setCurrentPage] = useState(1);
  const expertsPerPage = 3;

  // 🔥 Fetch Experts
  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/experts");
      setExperts(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load experts ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Add Expert
  const addExpert = async () => {
    if (!name || !cat || !exp || !rating) {
      alert("Fill all fields");
      return;
    }

    if (exp < 0 || rating < 1 || rating > 5) {
      alert("Invalid experience or rating");
      return;
    }

    try {
      await API.post("/experts", {
        name,
        category: cat,
        experience: exp,
        rating,
      });

      setName("");
      setCat("");
      setExp("");
      setRating("");

      fetchExperts();
    } catch (err) {
      console.error(err);
      alert("Error adding expert");
    }
  };

  // 🔥 Reset page when filtering
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  // 🔥 Filter Logic
  const filteredExperts = experts.filter((e) => {
    return (
      e.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || e.category === category)
    );
  });

  // 🔥 Pagination
  const indexOfLast = currentPage * expertsPerPage;
  const indexOfFirst = indexOfLast - expertsPerPage;
  const currentExperts = filteredExperts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="container">
      <h1>🚀 Expert Booking App</h1>

      {/* 🔥 Add Expert */}
      <div className="card">
        <h2>Add Expert</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Category (AI, Web Dev...)"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        />

        <input
          placeholder="Experience (years)"
          type="number"
          value={exp}
          onChange={(e) => setExp(e.target.value)}
        />

        <input
          placeholder="Rating (1-5)"
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button onClick={addExpert}>Add Expert</button>
      </div>

      {/* 🔥 Search + Filter */}
      <div className="controls">
        <input
          placeholder="Search by name..."
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

      {/* 🔥 Loading + Error */}
      {loading && <p style={{ textAlign: "center" }}>Loading experts...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* 🔥 Expert List */}
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
            <p>📂 Category: {e.category}</p>
            <p>🧠 Experience: {e.experience} years</p>
            <p>⭐ Rating: {e.rating}</p>
          </div>
        ))}
      </div>

      {/* 🔥 Pagination */}
      {!loading && filteredExperts.length > expertsPerPage && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span> Page {currentPage} </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLast >= filteredExperts.length}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpertList;