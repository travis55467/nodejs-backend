const Wishlist = require("../models/wishlist");


exports.toggleFavorite = async (req, res) => {
  try {
    const { userId, stayId } = req.body;

    if (!userId || !stayId) {
      return res.status(400).json({ message: "userId and stayId are required" });
    }

    // Check if the stay is already in the user wishlist
    const existing = await Wishlist.findOne({ userId, stayId });

    if (existing) {
      // If already favorited, remove it
      await Wishlist.findByIdAndDelete(existing._id);
      return res.status(200).json({ message: "Removed from wishlist", favorited: false });
    } else {


      // If not favorited yet, add it
      const newFavorite = await Wishlist.create({ userId, stayId });
      return res.status(201).json({ message: "Added to wishlist", favorited: true });
    }
  } catch (err) {
    console.error("Error toggling favorite:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.getFavoritesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Find all wishlist 
    const favorites = await Wishlist.find({ userId }).populate("stayId");

    
    const stays = favorites.map(fav => fav.stayId);

    res.status(200).json(stays);
  } catch (err) {
    console.error("Error fetching user favorites:", err);
    res.status(500).json({ error: err.message });
  }
};
