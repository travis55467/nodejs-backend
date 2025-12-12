const Booking = require("../models/booking");
const Stay = require("../models/stay");
const User = require("../models/userprofile"); // User model

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { stayId, userId, checkIn, checkOut, guests, userName, userProfilePic } = req.body;

    const stay = await Stay.findById(stayId);
    if (!stay) return res.status(404).json({ message: "Stay not found" });

    const days = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
    const totalPrice = days * stay.price;

    const booking = await Booking.create({
      stayId,
      hostId: stay.hostId,
      stayTitle: stay.title,
      stayImage: stay.imageUrls[0],
      userId,
      userName,
      userProfilePic,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper to attach user & stay info
const attachUserAndStayInfo = async (booking) => {
  const stay = await Stay.findById(booking.stayId);
  if (!stay) return null; // skip deleted stays

  const user = await User.findOne({ uid: booking.userId });

  return {
    ...booking.toObject(),
    stayTitle: stay.title,
    stayImage: stay.imageUrls[0] || "",
    userName: user ? user.name : "Unknown",
    userPhoto: user ? user.profilePicUrl : "",
  };
};

// Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    const bookingsWithInfo = await Promise.all(
      bookings.map(attachUserAndStayInfo)
    );
    res.json(bookingsWithInfo.filter(b => b !== null));
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get bookings by user
const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId });
    const bookingsWithInfo = await Promise.all(
      bookings.map(attachUserAndStayInfo)
    );
    res.json(bookingsWithInfo.filter(b => b !== null));
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get bookings by stay
const getBookingsByStay = async (req, res) => {
  try {
    const { stayId } = req.params;
    const bookings = await Booking.find({ stayId });
    const bookingsWithInfo = await Promise.all(
      bookings.map(attachUserAndStayInfo)
    );
    res.json(bookingsWithInfo.filter(b => b !== null));
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get bookings by host
const getBookingsByHost = async (req, res) => {
  try {
    const { hostId } = req.params;
    const bookings = await Booking.find({ hostId });
    const bookingsWithInfo = await Promise.all(
      bookings.map(attachUserAndStayInfo)
    );
    res.json(bookingsWithInfo.filter(b => b !== null));
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingsByUser,
  getBookingsByStay,
  getBookingsByHost,
};
