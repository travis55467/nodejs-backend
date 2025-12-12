const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBookingsByUser,
  getBookingsByStay,
  getBookingsByHost
} = require("../controllers/bookingController");

// Create a new booking
router.post("/", createBooking);

// Get all bookings
router.get("/", getBookings);

// Get bookings by user
router.get("/user/:userId", getBookingsByUser);

// Get bookings by stay
router.get("/stay/:stayId", getBookingsByStay);

// Get bookings by host
router.get("/host/:hostId", getBookingsByHost);

module.exports = router;
