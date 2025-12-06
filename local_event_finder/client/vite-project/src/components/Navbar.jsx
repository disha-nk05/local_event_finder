import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#4F46E5" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          Local Event Finder
        </Typography>

        <Box>
          <Button component={Link} to="/events" sx={{ color: "#fff", mx: 1 }}>
            Events
          </Button>

          {token && (
            <Button component={Link} to="/create-event" sx={{ color: "#fff", mx: 1 }}>
              Create Event
            </Button>
          )}

          {!token && (
            <>
              <Button component={Link} to="/login" sx={{ color: "#fff", mx: 1 }}>
                Login
              </Button>
              <Button component={Link} to="/register" sx={{ color: "#fff", mx: 1 }}>
                Register
              </Button>
            </>
          )}

          {token && (
            <Button onClick={handleLogout} sx={{ color: "#fff", mx: 1 }}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
