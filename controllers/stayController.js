const Stay = require("../models/stay");


exports.createStay = async (req, res) => {
  try {
    const stayData = req.body; 
    const stay = await Stay.create(stayData); 
    res.status(201).json(stay);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getStays = async (req, res) => {
  try {
    const stays = await Stay.find();
    res.status(200).json(stays);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getStayById = async (req, res) => {
  try {
    const stay = await Stay.findById(req.params.id);
    if (!stay) return res.status(404).json({ message: "Stay not found" });
    res.status(200).json(stay);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateStay = async (req, res) => {
  try {
    const stay = await Stay.findById(req.params.id);
    if (!stay) return res.status(404).json({ message: "Stay not found" });

 
    if (stay.hostId !== req.body.hostId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    Object.assign(stay, req.body);
    await stay.save();
    res.status(200).json(stay);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteStay = async (req, res) => {
  try {
    const stay = await Stay.findById(req.params.id);
    if (!stay) return res.status(404).json({ message: "Stay not found" });

    if (stay.hostId !== req.body.hostId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await stay.deleteOne();
    res.status(200).json({ message: "Stay deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.toggleFavorite = async (req, res) => {
  try {
    const stay = await Stay.findById(req.params.id);
    if (!stay) return res.status(404).json({ message: "Stay not found" });

    stay.isFavorite = !stay.isFavorite;
    await stay.save();
    res.status(200).json(stay);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.getStaysByHost = async (req, res) => {
  try {
    const { hostId } = req.params; 
    const stays = await Stay.find({ hostId });
    res.status(200).json(stays);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
