const mongoose = require("mongoose");

const userAccountSchema = new mongoose.Schema({
  balance: { type: Number, required: true, default: 0 },
  validity: { type: Boolean, required: true, default: true },
  isPermanant: { type: Boolean, required: true, default: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

const UserAccount = mongoose.model("userAccount", userAccountSchema);
module.exports = UserAccount;
