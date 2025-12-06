import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import CreateEventPage from "./pages/CreateEventPage.jsx";
import EventDetailsPage from "./pages/EventDetailsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import RegisteredUsersPage from "./pages/RegisteredUsersPage.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Events List (After Login Redirect) */}
        <Route path="/events" element={<HomePage />} />

        {/* Create Event (Protected) */}
        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <CreateEventPage />
            </ProtectedRoute>
          }
        />

        {/* Event Details */}
        <Route path="/events/:id" element={<EventDetailsPage />} />

        {/* Attendees (Protected) */}
        <Route
          path="/events/:id/attendees"
          element={
            <ProtectedRoute>
              <RegisteredUsersPage />
            </ProtectedRoute>
          }
        />

        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>
      <Footer />
    </>
  );
}
