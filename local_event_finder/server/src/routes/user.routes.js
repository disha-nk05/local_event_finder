// server/src/routes/user.routes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  getMyProfile,
  getUserById,
  updateMyProfile,
  deleteMyAccount,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// @route   POST /api/users/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username: username || email.split("@")[0],
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Failed to register. Please try again." });
  }
});

// @route   POST /api/users/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Failed to login. Please try again." });
  }
});

// @route   GET /api/users/me
router.get("/me", auth, getMyProfile);

// @route   GET /api/users/:id
router.get("/:id", auth, getUserById);

// @route   PUT /api/users/me
router.put("/me", auth, updateMyProfile);

// @route   DELETE /api/users/me
router.delete("/me", auth, deleteMyAccount);

export default router;