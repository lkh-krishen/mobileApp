const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "userAccount",
    default: null,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
