import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import api from "../utils/axios";

export default function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("/events", { title, description, date, location, image });
      setSuccess("Event created successfully!");
      setError("");
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setImage("");
    } catch (err) {
      console.error("Error creating event:", err);
      setError("Failed to create event");
      setSuccess("");
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Event
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <TextField label="Title" fullWidth sx={{ my: 1 }} value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField label="Description" fullWidth sx={{ my: 1 }} value={description} onChange={(e) => setDescription(e.target.value)} />
      <TextField label="Date" type="date" fullWidth sx={{ my: 1 }} value={date} onChange={(e) => setDate(e.target.value)} InputLabelProps={{ shrink: true }} />
      <TextField label="Location" fullWidth sx={{ my: 1 }} value={location} onChange={(e) => setLocation(e.target.value)} />
      <TextField label="Image URL" fullWidth sx={{ my: 1 }} value={image} onChange={(e) => setImage(e.target.value)} />

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        Create Event
      </Button>
    </Container>
  );
}