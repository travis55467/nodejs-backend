


const express = require("express");
const router = express.Router();

const { 
  createStay, 
  getStays, 
  getStayById, 
  updateStay, 
  deleteStay,
  toggleFavorite,
  getStaysByHost,
} = require("../controllers/stayController");

const { getStayDetail } = require("../controllers/staydetailController"); 




router.get("/host/:hostId", getStaysByHost);  


router.get("/:id/detail", getStayDetail);   

router.get("/:id", getStayById);            
router.get("/", getStays);                  



router.post("/", createStay);
router.put("/:id", updateStay);
router.delete("/:id", deleteStay);


router.patch("/:id/favorite", toggleFavorite);

module.exports = router;
