const UserProfile = require("../models/userprofile");


exports.getUserProfile = async (req, res) => {
  try {
    const { uid } = req.params;

    const profile = await UserProfile.findOne({ uid });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.saveUserProfile = async (req, res) => {
  try {
    const { uid } = req.params;
    const { name, about, interests, profilePicUrl } = req.body;

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { uid },
      { name, about, interests, profilePicUrl },
      { new: true, upsert: true } 
    );

    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
