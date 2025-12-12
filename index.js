

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");   
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());               
app.use(bodyParser.json());
app.use(express.json());       





const categoryRoutes = require("./routes/categoryRoutes");
const stayRoutes = require("./routes/stayRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const userProfileRoutes = require("./routes/userprofileRoutes");
const bookingRoutes = require("./routes/bookingRoutes"); 




app.use("/api/categories", categoryRoutes);
app.use("/api/stays", stayRoutes);       
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/profile", userProfileRoutes); 
app.use("/api/bookings", bookingRoutes); 




mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🚀 Connected to MongoDB successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));




app.listen(PORT, "0.0.0.0", () => {
  console.log(`💡 Server running on http://0.0.0.0:${PORT}`);
});
