// src/utils/auth.js
import jwtDecode from "jwt-decode";

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Decode token to get user info
export const getUser = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded; // contains { id, iat, exp }
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    // Check expiration
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
};