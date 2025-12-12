const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  stayId: { type: String, required: true },
  hostId: { type: String, required: true },          // host who owns the stay
  stayTitle: { type: String },                        // title of the stay
  stayImage: { type: String },                        // first image of the stay
  userId: { type: String, required: true },
  userName: { type: String },                         // name of the user who booked
  userProfilePic: { type: String },                  // user's profile picture
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
