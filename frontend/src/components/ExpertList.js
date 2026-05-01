import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const ExpertList = () => {
  const navigate = useNavigate();

  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ SIMPLE FETCH (OLD STABLE)
  useEffect(() => {
    API.get("/experts")
      .then((res) => {
        setExperts(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load experts");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Expert Booking App</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {experts.length === 0 && !loading && (
        <p>No experts found</p>
      )}

      {experts.map((e) => (
        <div
          key={e._id}
          onClick={() => navigate(`/expert/${e._id}`)}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          <h3>{e.name}</h3>
          <p>{e.category}</p>
          <p>{e.experience} years</p>
          <p>⭐ {e.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default ExpertList;