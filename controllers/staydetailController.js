const Stay = require("../models/stay");
const UserProfile = require("../models/userprofile");

const getStayDetail = async (req, res) => {
  try {
    const stay = await Stay.findById(req.params.id);

    if (!stay) return res.status(404).json({ message: "Stay not found" });

    // Fetch host profile
    let hostProfile = null;

    // If your stay stores Firebase UID inside hostId → this is correct
    if (stay.hostId) {
      hostProfile = await UserProfile.findOne({ uid: stay.hostId });
    }

    res.json({
      stay: {
        id: stay._id,
        title: stay.title,
        description: stay.description,
        location: stay.location,
        price: stay.price,
        imageUrls: stay.imageUrls,
        available: stay.available,
        isActive: stay.isActive,
        isFavorite: stay.isFavorite,
        category: stay.category,
        bedrooms: stay.bedrooms,
        guests: stay.guests,
        beds: stay.beds,
        lockInBedroom: stay.lockInBedroom,
        bathroomType: stay.bathroomType,
        amenities: stay.amenities,

        // 🔥 FIX: include Firebase UID
        host: hostProfile
          ? {
              id: hostProfile._id,          // MongoDB ID
              uid: hostProfile.uid,         // Firebase UID (IMPORTANT)
              name: hostProfile.name,
              profilePicUrl: hostProfile.profilePicUrl,
              email: hostProfile.email,
            }
          : null,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getStayDetail };
