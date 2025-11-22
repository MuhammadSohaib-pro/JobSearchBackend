const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    verification: { type: Boolean, default: false },
    phoneNumber: { type: String, default: "1234567" },
    userType: {
      type: String,
      required: true,
      default: "User",
      enum: ["User", "Admin", "HiringCompany"],
    },
    profileImage: { type: String },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        (ret.userId = ret._id.toString()), delete ret._id;
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("User", userSchema);
