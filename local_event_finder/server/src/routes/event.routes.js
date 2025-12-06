// server/src/routes/events.routes.js
import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerAttendee,
} from "../controllers/event.controller.js";
import auth from "../middleware/auth.js";
import Event from "../models/Event.js";

const router = express.Router();

// @route   POST /api/events
// @desc    Create new event
// @access  Private
router.post("/", auth, createEvent);

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get("/", getEvents);

// @route   GET /api/events/:id
// @desc    Get single event by ID
// @access  Public
router.get("/:id", getEventById);

// @route   PUT /api/events/:id
// @desc    Update event
// @access  Private
router.put("/:id", auth, updateEvent);

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private
router.delete("/:id", auth, deleteEvent);

// @route   POST /api/events/:id/attendees
// @desc    RSVP to event
// @access  Private
router.post("/:id/attendees", auth, registerAttendee);
// @route   DELETE /api/events/:id/attendees
// @desc    Unregister user from event
// @access  Private
router.delete("/:id/attendees", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    event.attendees = event.attendees.filter(
      (att) => att.toString() !== req.user.id
    );

    await event.save();
    res.json({ message: "Unregistered successfully" });
  } catch (err) {
    console.error("Unregister error:", err);
    res.status(500).json({ error: "Failed to unregister" });
  }
});


// @route   GET /api/events/:id/attendees
// @desc    Get list of attendees for this event
// @access  Private (You can make it Public if you want)
router.get("/:id/attendees", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "attendees",
      "name email"
    );

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event.attendees);
  } catch (err) {
    console.error("Error loading attendees:", err);
    res.status(500).json({ error: "Failed to load attendees" });
  }
});

export default router;
