import { useState } from "react";
import API from "../services/api";

export default function ExpertForm() {
  const [name, setName] = useState("");
  const [field, setField] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/experts", { name, field });
    alert("Expert added");
    setName("");
    setField("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Expert</h3>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Field"
        value={field}
        onChange={(e) => setField(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}