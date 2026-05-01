import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const ExpertList = () => {
  const navigate = useNavigate();

  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 Fetch Experts
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const res = await API.get("/experts");

        // safety check
        if (Array.isArray(res.data)) {
          setExperts(res.data);
        } else {
          setExperts([]);
        }

      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err?.message || "Failed to load experts");
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚀 Expert Booking App</h1>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* ERROR SAFE */}
      {!loading && error && (
        <p style={{ color: "red" }}>
          {typeof error === "string" ? error : "Something went wrong"}
        </p>
      )}

      {/* EMPTY */}
      {!loading && experts.length === 0 && !error && (
        <p>No experts found</p>
      )}

      {/* LIST */}
      {!loading &&
        experts.length > 0 &&
        experts.map((e) => {
          if (!e || typeof e !== "object") return null;

          return (
            <div
              key={e._id || Math.random()}
              onClick={() => navigate(`/expert/${e._id}`)}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
            >
              <h3>{e.name || "No Name"}</h3>
              <p>Category: {e.category || "N/A"}</p>
              <p>Experience: {e.experience || 0} years</p>
              <p>⭐ {e.rating || 0}</p>
            </div>
          );
        })}
    </div>
  );
};

export default ExpertList;