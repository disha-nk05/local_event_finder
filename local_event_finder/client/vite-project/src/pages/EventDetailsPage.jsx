import React, { useEffect, useState } from "react";
import { Container, Typography, Alert, Button } from "@mui/material";
import api from "../utils/axios";
import { useParams, useNavigate } from "react-router-dom";

// Decode logged-in user ID
const userToken = localStorage.getItem("token");
const userId = userToken ? JSON.parse(atob(userToken.split(".")[1])).id : null;

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError("⚠️ Failed to load event details.");
      }
    };
    fetchEvent();
  }, [id]);

  // RSVP function
  const handleRSVP = async () => {
    try {
      await api.post(`/events/${id}/attendees`);
      setSuccess("🎉 You have successfully registered!");
      setError("");

      // Update UI
      setEvent({ ...event, attendees: [...event.attendees, userId] });
    } catch (err) {
      console.error("RSVP Error:", err);
      setError("Failed to register. Please try again.");
      setSuccess("");
    }
  };

  // UNREGISTER function
  const handleUnregister = async () => {
    try {
      await api.delete(`/events/${id}/attendees`);
      setSuccess("You have been unregistered.");
      setError("");

      // Update UI
      setEvent({
        ...event,
        attendees: event.attendees.filter((att) => att !== userId),
      });
    } catch (err) {
      console.error("Unregister Error:", err);
      setError("Failed to unregister");
      setSuccess("");
    }
  };

  // DELETE EVENT (Only creator can delete)
  const handleDeleteEvent = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await api.delete(`/events/${id}`);
      navigate("/events");
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete event.");
    }
  };

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!event) return <Typography>Loading...</Typography>;

  const isCreator = event.createdBy && event.createdBy._id === userId;
  const isRegistered = event.attendees.includes(userId);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {event.title}
      </Typography>

      <Typography variant="body1">{event.description}</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        📍 {event.location}
      </Typography>
      <Typography variant="body2">
        📅 {new Date(event.date).toLocaleDateString()}
      </Typography>

      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          style={{ marginTop: "20px", maxWidth: "100%" }}
        />
      )}

      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {/* RSVP or UNREGISTER */}
      {!isRegistered ? (
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 3 }}
          onClick={handleRSVP}
        >
          RSVP
        </Button>
      ) : (
        <Button
          variant="contained"
          color="warning"
          sx={{ mt: 3 }}
          onClick={handleUnregister}
        >
          Unregister
        </Button>
      )}

      {/* DELETE EVENT BUTTON (Only creator) */}
{event.createdBy &&
  (event.createdBy._id === userId || event.createdBy === userId) && (
    <Button
      variant="outlined"
      color="error"
      sx={{ mt: 3, ml: 2 }}
      onClick={handleDeleteEvent}
    >
      Delete Event
    </Button>
  )}


      {/* BACK */}
      <Button
        variant="outlined"
        sx={{ mt: 3, ml: 2 }}
        onClick={() => navigate("/events")}
      >
        Back to Events
      </Button>
    </Container>
  );
}
