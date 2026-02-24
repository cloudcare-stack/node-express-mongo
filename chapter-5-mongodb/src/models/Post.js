// src/models/Post.js
const mongoose = require("mongoose");

// Define the Post schema with title and content fields, and timestamps for createdAt and updatedAt
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    content: { type: String, required: true, trim: true, maxlength: 5000 },
  },
  { timestamps: true }
);

// Export the Post model based on the postSchema
module.exports = mongoose.model("Post", postSchema);