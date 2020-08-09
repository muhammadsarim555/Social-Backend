const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile_image: { type: String },
  created_at: {type:String}
});

module.exports = mongoose.model("Users", userSchema);
