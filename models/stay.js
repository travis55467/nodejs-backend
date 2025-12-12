const mongoose = require("mongoose");

const staySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrls: [String],
  description: String,

  hostId: { type: String },

  available: { type: Boolean, default: true },
  isActive: { type: Boolean, default: false },
  isFavorite: { type: Boolean, default: false },

  // NEW FIELDS YOU ADDED
  category: { type: String },

  bedrooms: { type: Number, default: 1 },
  guests: { type: Number, default: 1 },
  beds: { type: Number, default: 1 },

  lockInBedroom: { type: Boolean, default: false },

  bathroomType: {
    type: String,
    enum: ["attached", "dedicated"],
    default: "attached"
  },

  amenities: [String], // wifi, tv, kitchen, parking, etc.
});

module.exports = mongoose.model("Stay", staySchema);
