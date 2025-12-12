



const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, 
  name: { type: String, default: "" },
  about: { type: String, default: "" },
  interests: { type: [String], default: [] },
  profilePicUrl: { type: String, default: "" }, 
}, { timestamps: true });

module.exports = mongoose.model("UserProfile", UserProfileSchema);
