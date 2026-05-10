# ExpertSync: Real-Time Mobile Booking System

This is a mobile application built with React Native and the MERN stack (MongoDB, Express, React Native, Node.js) that allows users to find experts and book consultation sessions.

### 📱 Live Interactive Demo
👉 **[Click here to try the app live in your browser!](https://appetize.io/app/b_vzisgq77cgwig6bciysciziloi)**

### 📦 Download APK
📥 **[Download the Android APK from Google Drive](https://drive.google.com/file/d/1g5tUXk1viwv5n6s2G4umM0IrRXUvepj_/view?usp=drive_link)**

---

## Tech Stack

* **Frontend**: React Native, React Navigation, Axios, Socket.io-client
* **Backend**: Node.js, Express.js, Socket.io
* **Database**: MongoDB, Mongoose
* **Tools**: Android Studio, React Native CLI

---

## Overview of Approach

The application is designed to be a robust, real-time booking system for scheduling consultation sessions with various experts. The system follows a client-server architecture using the MERN stack customized for mobile (React Native instead of React JS).

1.  **Frontend (Mobile App):** The user interface is built with React Native, providing a native mobile experience. Real-time updates for slot availability are integrated via WebSockets (`socket.io-client`), ensuring that if one user books a slot, it immediately reflects as unavailable on other active clients' screens.
2.  **Backend (API Server):** Built with Node.js and Express, it provides RESTful API endpoints for querying experts, retrieving available time slots, and submitting bookings. The server also manages WebSocket connections to broadcast booking events to all connected clients.
3.  **Database Strategy:** MongoDB stores expert profiles, available slots, and booking records. A crucial part of the approach is preventing double-bookings. This is achieved at the database level using a **Partial Unique Compound Index** on `expertId`, `date`, and `timeSlot`, guaranteeing data integrity even under high concurrency.
4.  **Date & Time Management:** The application performs checks based on the user's current local time to automatically disable slots that have already passed, preventing invalid booking attempts.

---

## Features

### Expert Listing
* **Search & Filter**: Search for experts by name or filter them by category (Health, Finance, Technology, Career).
* **Pagination**: Lists are paginated to handle large amounts of data efficiently.

### Expert Details & Scheduling
* **Calendar Integration**: Select dates using a calendar component to view available time slots.
* **Time Management**: Slots that have already passed based on the current local time are automatically disabled.
* **Real-time Updates**: If another user books a time slot, it instantly becomes disabled on your screen without needing to refresh the app.

### Booking System
* **Booking Form**: Collects the user's name, email, phone, and optional notes.
* **Validation**: Enforces required fields and prevents multiple submissions if the button is clicked twice.

### My Bookings
* **Check History**: Users can enter their email address to retrieve their booking history.
* **Booking Status**: Displays badges showing whether a session is Pending, Confirmed, or Completed. 

---

## Technical Implementation

* **Double Booking Prevention**: Handled at the database level using a MongoDB Partial Unique Compound Index `({ expertId: 1, date: 1, timeSlot: 1 })`. This ensures that the database rejects duplicate bookings for the same slot. A partial filter expression `(status: { $ne: 'Completed' })` is used so that if an admin marks a session as completed, the slot becomes available again.
* **Real-Time Sync**: Uses Socket.io to push a `'slotBooked'` event to clients whenever a new booking is created, keeping the available slots updated across all devices.
* **Structure**: The backend follows a standard MVC architecture (`models/`, `controllers/`, `routes/`) to keep the code organized.

---

## Setup Instructions

### Prerequisites
* Node.js (v16+)
* MongoDB Atlas account (or local MongoDB)
* Android Studio (for the Android Emulator)
* React Native CLI environment setup

> **Note**: The mobile app is currently pre-configured to connect to the live cloud backend. **You can skip the Backend Setup entirely and just run the Mobile Frontend to test the app out-of-the-box!** If you wish to run and test the backend locally on your own machine instead, please update `API_URL` and `SOCKET_URL` in `mobile/src/services/api.js` and `socket.js` to `http://10.0.2.2:5000` before following the steps below.

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update your `.env` file with your connection details:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster...
   ```
4. Seed the database with sample data:
   ```bash
   node seed.js
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### 2. Mobile Frontend Setup
1. Open a new terminal window and navigate to the mobile folder:
   ```bash
   cd mobile
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Metro Bundler:
   ```bash
   npm start -- --reset-cache
   ```
4. Launch the app on your Android Emulator:
   ```bash
   npm run android
   ```
