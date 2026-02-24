// src/config/db.js
const mongoose = require("mongoose");

// Connect to MongoDB
async function connectDB(uri) {
    // Use the new URL parser and unified topology options
  try {
    // Connect to MongoDB using the provided URI
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

// Export the connectDB function
module.exports = connectDB;