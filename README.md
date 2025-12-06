Namma Events – Local Event Finder

A full-stack web application where users can browse events, register (RSVP), and manage their own events.
Built using React + Vite, Node.js, Express.js, and MongoDB.

Features:
User Features
Register and login
Browse all available events
View detailed event information
RSVP to events
Unregister from events
Event Creator Features
Create new events
Delete events created by themselves
View attendees for their events

Additional Features:
JWT authentication
Protected routes
Clean UI built using Material UI
Fully responsive design

Tech Stack:

Frontend:
React (Vite)
Material UI
Axios

Backend:
Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication

Installation & Setup:
1. Clone the repository
git clone <your-repository-link>

2. Install frontend dependencies
cd client
npm install

3. Install backend dependencies
cd ../server
npm install

4. Create .env file in server
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000

5. Run backend
npm run dev

6. Run frontend
npm run dev

Folder Structure:
local_event_finder/
│
├── client/        # React frontend
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
├── server/        # Node.js backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   └── .env
│
└── README.md

How to Use:

Register a new user
Log in using your credentials
Browse events
RSVP or unregister
Create event (only after login)
Delete events created by you

