



const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  stayId: { type: mongoose.Schema.Types.ObjectId, ref: "Stay", required: true },
}, { timestamps: true }); 

module.exports = mongoose.model("Wishlist", wishlistSchema);
