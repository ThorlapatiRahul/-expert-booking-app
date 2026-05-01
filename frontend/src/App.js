import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpertList from "./components/ExpertList";
import Booking from "./pages/Booking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExpertList />} />
        <Route path="/expert/:id" element={<Booking />} />
      </Routes>
    </Router>
  );
}

export default App;