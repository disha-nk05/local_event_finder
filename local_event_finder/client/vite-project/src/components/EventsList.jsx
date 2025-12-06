import { useEffect, useState } from "react";
import { Box, CircularProgress, Alert, Typography } from "@mui/material";
import axiosInstance from "../utils/axios"; // use your configured axios instance
// If your axios instance is named/exported differently, adjust this import accordingly.

function formatDate(dateValue) {
  try {
    const d = new Date(dateValue);
    if (Number.isNaN(d.getTime())) return "Date not available";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Date not available";
  }
}

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async () => {
      try {
        // Prefer base URL in axios instance; fallback path only if needed
        const res = await axiosInstance.get("/api/events");
        if (!isMounted) return;
        setEvents(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        if (!isMounted) return;
        setErrMsg(
          err?.response?.data?.message ||
            err?.message ||
            "Error fetching events."
        );
        console.error("Error fetching events:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <CircularProgress size={20} />
        <Typography variant="body2">Loading events…</Typography>
      </Box>
    );
  }

  if (errMsg) {
    return <Alert severity="error">{errMsg}</Alert>;
  }

  if (events.length === 0) {
    return (
      <Alert severity="info">
        No events found. Try seeding your database again.
      </Alert>
    );
  }

  return (
    <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
      {events.map((event) => (
        <Box
          key={event._id}
          component="li"
          sx={{
            mb: 2,
            p: 2,
            border: "1px solid #e5e7eb",
            borderRadius: 1,
            backgroundColor: "#fafafa",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {event.title || "Untitled event"}
          </Typography>
          <Typography variant="body2">📍 {event.location || "TBD"}</Typography>
          <Typography variant="body2">📅 {formatDate(event.date)}</Typography>
          {event.description ? (
            <Typography variant="body2" sx={{ mt: 1 }}>
              📝 {event.description}
            </Typography>
          ) : null}
        </Box>
      ))}
    </Box>
  );
}