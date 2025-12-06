import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User from "./models/User.js";
import Event from "./models/Event.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding");

    // Clear existing data
    await User.deleteMany();
    await Event.deleteMany();

    // Create sample users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const user1 = new User({
      name: "Alice",
      username: "alice123",
      email: "alice@example.com",
      password: hashedPassword,
    });

    const user2 = new User({
      name: "Bob",
      username: "bob123",
      email: "bob@example.com",
      password: hashedPassword,
    });

    await user1.save();
    await user2.save();

    // Create sample events (no slug field)
    const events = [
      {
        title: "Music Festival",
        date: new Date("2025-12-20"),
        location: "Bengaluru",
        description: "An amazing evening of live music.",
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
        createdBy: user1._id,
        attendees: [user2._id],
      },
      {
        title: "Tech Conference",
        date: new Date("2026-01-15"),
        location: "Hyderabad",
        description: "Latest trends in AI and Web Development.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
        createdBy: user2._id,
        attendees: [user1._id],
      },
      {
        title: "Food Carnival",
        date: new Date("2026-02-10"),
        location: "Mumbai",
        description: "Taste cuisines from around the world.",
        image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80",
        createdBy: user1._id,
      },
      {
        title: "Startup Pitch Night",
        date: new Date("2026-03-05"),
        location: "Delhi",
        description: "Innovators showcase their groundbreaking ideas.",
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80",
        createdBy: user2._id,
      },
      {
        title: "Art Exhibition",
        date: new Date("2026-04-12"),
        location: "Chennai",
        description: "Explore modern and traditional artworks.",
        image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
        createdBy: user1._id,
      },
      {
        title: "Cricket Tournament",
        date: new Date("2026-05-20"),
        location: "Kolkata",
        description: "Exciting matches between top teams.",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
        createdBy: user2._id,
      },
      {
        title: "Dance Workshop",
        date: new Date("2026-06-15"),
        location: "Pune",
        description: "Learn contemporary dance moves from experts.",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
        createdBy: user1._id,
      },
      {
        title: "Book Fair",
        date: new Date("2026-07-10"),
        location: "Lucknow",
        description: "Discover books from authors worldwide.",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
        createdBy: user2._id,
      },
      {
        title: "Film Screening",
        date: new Date("2026-08-18"),
        location: "Goa",
        description: "Watch indie films under the stars.",
        image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80",
        createdBy: user1._id,
      },
      {
        title: "Yoga Retreat",
        date: new Date("2026-09-25"),
        location: "Rishikesh",
        description: "Relax and rejuvenate with yoga sessions.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
        createdBy: user2._id,
      },
    ];

    await Event.insertMany(events);

    console.log("🎉 Database seeded successfully with users and events");
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    await mongoose.disconnect(); // ensure disconnect even on error
    process.exit(1);
  }
};

seedData();