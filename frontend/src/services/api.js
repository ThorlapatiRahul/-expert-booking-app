import axios from "axios";

const API = axios.create({
  baseURL: "https://expert-booking-backend.onrender.com/api", // ✅ FIX
});

export default API;