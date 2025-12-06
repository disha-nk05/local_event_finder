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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/users/login", { email, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);

      setSuccess(`Welcome back, ${user.name}!`);
      setError("");
      setEmail("");
      setPassword("");

      setTimeout(() => navigate("/events"), 1500);
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
      setSuccess("");
    }
  };

  return (
    <Container sx={{ py: 4, maxWidth: "500px" }}>
      <Typography variant="h4" gutterBottom>
        Login 🔑
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

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
        onClick={handleLogin}
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Container>
  );
}
