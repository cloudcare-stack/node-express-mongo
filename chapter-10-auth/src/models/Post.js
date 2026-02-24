const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    content: { type: String, required: true, trim: true, maxlength: 5000 },

    // NEW
    imageFilename: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);