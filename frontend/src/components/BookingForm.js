import { useState } from "react";
import API from "../services/api";

const BookingForm = ({ fetchExperts }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    experience: "",
    rating: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addExpert = async () => {
    try {
      await API.post("/experts", form);
      fetchExperts(); // refresh list
      setForm({
        name: "",
        category: "",
        experience: "",
        rating: ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h3>Add Expert</h3>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Category (Doctor, Mentor, etc)"
        value={form.category}
        onChange={handleChange}
      />

      <input
        name="experience"
        placeholder="Experience (years)"
        value={form.experience}
        onChange={handleChange}
      />

      <input
        name="rating"
        placeholder="Rating (1-5)"
        value={form.rating}
        onChange={handleChange}
      />

      <button onClick={addExpert}>Add</button>
    </div>
  );
};

export default BookingForm;