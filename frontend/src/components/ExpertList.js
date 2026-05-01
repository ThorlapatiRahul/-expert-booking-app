import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const ExpertList = () => {
  const navigate = useNavigate();

  const [experts, setExperts] = useState([]);

  useEffect(() => {
    API.get("/experts")
      .then((res) => setExperts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Expert Booking App</h1>

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