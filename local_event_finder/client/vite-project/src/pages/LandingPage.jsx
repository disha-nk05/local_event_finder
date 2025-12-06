import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Container sx={{ textAlign: "center", py: 12 }}>
      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        Welcome to Namma Events<h6>The Local Event Finder </h6>
      </Typography>

      <Typography variant="h6" sx={{ mt: 2, color: "gray" }}>
        Find the best events and register easily!
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mx: 2, px: 4 }}
          onClick={() => navigate("/login")}
        >
          Sign In
        </Button>

        <Button
          variant="outlined"
          color="primary"
          sx={{ mx: 2, px: 4 }}
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
}
