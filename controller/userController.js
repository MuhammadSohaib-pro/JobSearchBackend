const User = require("../model/UserModel");
const fs = require("fs");
const path = require("path");
const uploadProfile = require("../middleware/uploadProfile");

module.exports = {
  getUserById: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      const { password, __v, createdAt, ...userData } = user._doc;
      return res.status(200).json({ status: true, user: { ...userData } });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  updateUser: async (req, res) => {
    const id = req.params.id;
    uploadProfile(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ status: false, message: err.message });
      }
      const { username, firstName, lastName, phoneNumber } = req.body;

      const existingUser = await User.findById(id);
      if (!existingUser) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }
      const filePath =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
      const user = {
        username,
        firstName,
        lastName,
        phoneNumber,
        profileImage: filePath || existingUser.profileImage,
      };
      try {
        if (
          req.file &&
          existingUser.profileImage &&
          typeof existingUser.profileImage === "string" &&
          existingUser.profileImage !== ""
        ) {
          const oldFile = path.join(process.cwd(), existingUser.profileImage);

          fs.unlink(oldFile, (err) => {
            if (err) console.log("Failed to delete old profile image:", err);
          });
        }

        await User.findByIdAndUpdate(id, user, { new: true });
        return res
          .status(200)
          .json({ status: true, message: "user profile updated successfully" });
      } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
      }
    });
  },

  deleteUserById: async (req, res) => {
    try {
      const id = req.params.id;
      const existingUser = await User.findById(id);
      if (
        existingUser.profileImage &&
        typeof existingUser.profileImage === "string" &&
        existingUser.profileImage !== ""
      ) {
        const oldFile = path.join(process.cwd(), existingUser.profileImage);

        fs.unlink(oldFile, (err) => {
          if (err) console.log("Failed to delete old profile image:", err);
        });
      }
      await User.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ status: true, message: "user profile updated successfully" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};
