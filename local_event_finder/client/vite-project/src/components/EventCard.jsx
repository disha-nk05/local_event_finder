import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function formatDate(dateValue) {
  try {
    const d = new Date(dateValue);
    if (Number.isNaN(d.getTime())) return "Date not available";
    // Use a consistent, readable format; avoid locale surprises
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Date not available";
  }
}

export default function EventCard({ event }) {
  const navigate = useNavigate();

  const {
    _id,
    title = "Untitled event",
    image,
    date,
    location = "Location TBD",
    description = "",
  } = event || {};

  return (
    <Card
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.03)" },
      }}
      aria-label={`Event card for ${title}`}
    >
      {image ? (
        <CardMedia component="img" height="180" image={image} alt={title} />
      ) : null}

      <CardContent>
        <Typography variant="h6" noWrap title={title}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatDate(date)} • {location}
        </Typography>
        {description ? (
          <Typography variant="body2" sx={{ mt: 1 }}>
            {description}
          </Typography>
        ) : null}
      </CardContent>

      <CardActions sx={{ mt: "auto", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          disabled={!_id}
          onClick={() => navigate(`/events/${_id}`)}
        >
          View details
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={!_id}
          onClick={() => navigate(`/events/${_id}/attendees`)}
        >
          RSVP
        </Button>
      </CardActions>
    </Card>
  );
}