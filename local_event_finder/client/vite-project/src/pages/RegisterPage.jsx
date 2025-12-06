import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Send register request
      const res = await api.post("/users/register", {
        name,
        username,
        email,
        password,
      });

      // Registration success
      setSuccess("Registration successful! Please login to continue.");
      setError("");

      // ❌ DO NOT auto-login
      // ❌ DO NOT store token

      // Clear input fields
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");

      // Redirect to login page
      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      console.error("Error registering user:", err);
      setError("Failed to register. Please try again.");
      setSuccess("");
    }
  };

  return (
    <Container sx={{ py: 4, maxWidth: "500px" }}>
      <Typography variant="h4" gutterBottom>
        Register 📝
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <TextField
        label="Name"
        fullWidth
        sx={{ my: 1 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Username"
        fullWidth
        sx={{ my: 1 }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        label="Email"
        type="email"
        fullWidth
        sx={{ my: 1 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        autoComplete="new-password"
        fullWidth
        sx={{ my: 1 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleRegister}
        sx={{ mt: 2 }}
      >
        Register
      </Button>
    </Container>
  );
}
