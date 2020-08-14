const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  caption: { type: String },
  post_image: { type: String, required: true },
  created_at: { type: String, required: true },
  userId: { type: String, required: true },
  total_likes: { type: Number, required: true },
});

module.exports = mongoose.model("Posts", postSchema);
