import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#4F46E5",
        color: "#fff",
        py: 3,
        mt: 4,
        textAlign: "center",
      }}
    >
      <Typography variant="body1" sx={{ mb: 1 }}>
        © {new Date().getFullYear()} Namma Events. All rights reserved.
      </Typography>
      <Typography variant="body2">
        Built with ❤️ Find Your Local Events.
      </Typography>
      <Box sx={{ mt: 1 }}>
        <MuiLink
          component={RouterLink}
          to="/"
          color="inherit"
          underline="hover"
          sx={{ mx: 1 }}
        >
          Home
        </MuiLink>
        <MuiLink
          component={RouterLink}
          to="/events"
          color="inherit"
          underline="hover"
          sx={{ mx: 1 }}
        >
          Events
        </MuiLink>
        <MuiLink
          component={RouterLink}
          to="/login"
          color="inherit"
          underline="hover"
          sx={{ mx: 1 }}
        >
          Login
        </MuiLink>
        <MuiLink
          component={RouterLink}
          to="/register"
          color="inherit"
          underline="hover"
          sx={{ mx: 1 }}
        >
          Register
        </MuiLink>
      </Box>
    </Box>
  );
}