const handleAddExpert = async () => {
  try {
    const res = await API.post("/experts", {
      name,
      category,
      experience: Number(experience),
      rating: Number(rating),
    });

    console.log("SUCCESS:", res.data);

    alert("Expert added ✅");
    window.location.reload();
  } catch (err) {
    console.error("❌ ERROR:", err.response?.data || err);
    alert("Error adding expert ❌");
  }
};