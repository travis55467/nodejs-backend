



const express = require("express");
const router = express.Router();
const { getStayDetail } = require("../controllers/staydetailController");


router.get("/:id/detail", getStayDetail);

module.exports = router;
