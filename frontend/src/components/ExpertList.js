import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./ExpertList.css";

const ExpertList = () => {
  const navigate = useNavigate();

  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [name, setName] = useState("");
  const [cat, setCat] = useState("");
  const [exp, setExp] = useState("");
  const [rating, setRating] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const expertsPerPage = 3;

  // 🔥 FETCH EXPERTS
  const fetchExperts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/experts");

      if (!res.data) throw new Error("No data");

      setExperts(res.data);
    } catch (err) {
      console.error("FETCH ERROR:", err);

      if (err.response) {
        setError(err.response.data?.message || "Server error ❌");
      } else if (err.request) {
        setError("Backend is waking up... try again ⏳");
      } else {
        setError("Something went wrong ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  // 🔥 ADD EXPERT
  const addExpert = async () => {
    if (!name || !cat || !exp || !rating) {
      alert("Fill all fields");
      return;
    }

    if (Number(exp) < 0 || Number(rating) < 1 || Number(rating) > 5) {
      alert("Invalid experience or rating");
      return;
    }

    try {
      await API.post("/experts", {
        name,
        category: cat,
        experience: Number(exp),
        rating: Number(rating),
      });

      // reset form
      setName("");
      setCat("");
      setExp("");
      setRating("");

      fetchExperts();
    } catch (err) {
      console.error("ADD ERROR:", err);
      alert("Error adding expert ❌");
    }
  };

  // 🔥 FILTER
  const filteredExperts = experts.filter((e) => {
    return (
      e.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || e.category === category)
    );
  });

  // 🔥 PAGINATION
  const indexOfLast = currentPage * expertsPerPage;
  const indexOfFirst = indexOfLast - expertsPerPage;
  const currentExperts = filteredExperts.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    setCurrentPage(1);
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
          placeholder="Category (AI, Web Dev...)"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        />

        <input
          type="number"
          placeholder="Experience (years)"
          value={exp}
          onChange={(e) => setExp(e.target.value)}
        />

        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button onClick={addExpert}>Add Expert</button>
      </div>

      {/* SEARCH + FILTER */}
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

      {/* STATUS */}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

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
            <p>📂 Category: {e.category}</p>
            <p>🧠 Experience: {e.experience} years</p>
            <p>⭐ Rating: {e.rating}</p>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
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