

const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  saveUserProfile,
} = require("../controllers/userprofileController");


router.get("/:uid", getUserProfile);


router.post("/:uid", saveUserProfile);

module.exports = router;
