import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Button,
  Alert,
} from "@mui/material";
import EventCard from "../components/EventCard.jsx";
import api from "../utils/axios";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading events...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Events 🎉
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
          <Button
            onClick={fetchEvents}
            variant="outlined"
            size="small"
            sx={{ ml: 2 }}
          >
            Retry
          </Button>
        </Alert>
      )}

      <Grid container spacing={4} justifyContent="center" alignItems="stretch" sx={{ mt: 2 }}>
        {events.length > 0 ? (
          events.map((event) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={event._id} sx={{ display: "flex" }}>
              <EventCard event={event} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No events available. Check back later or create a new event!
          </Typography>
        )}
      </Grid>
    </Container>
  );
}