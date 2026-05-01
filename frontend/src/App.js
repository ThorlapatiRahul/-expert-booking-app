import axios from "axios";

const API = axios.create({
  baseURL: "https://expert-booking-backend-4as6.onrender.com",
});

export default API;