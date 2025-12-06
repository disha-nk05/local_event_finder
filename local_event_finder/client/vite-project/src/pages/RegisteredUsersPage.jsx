import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";
import api from "../utils/axios";

export default function RegisteredUsersPage() {
  const { id } = useParams();
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const res = await api.get(`/events/${id}/attendees`);
        setAttendees(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching attendees:", err);
        setError("Failed to load attendees.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Registered Users
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {attendees.length > 0 ? (
        <List>
          {attendees.map((user, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={user.name || "Unnamed"}
                secondary={user.email || "No email"}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No attendees yet.</Typography>
      )}
    </Container>
  );
}