

const express = require("express");
const router = express.Router();
const { toggleFavorite, getFavoritesByUser } = require("../controllers/wishlistController");


router.post("/toggle", toggleFavorite);


router.get("/:userId", getFavoritesByUser);

module.exports = router;
