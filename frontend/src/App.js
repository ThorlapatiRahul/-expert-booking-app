import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ExpertList from "./components/ExpertList";
import BookingPage from "./pages/Booking";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExpertList />} />
        <Route path="/expert/:id" element={<BookingPage />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
}

export default App;