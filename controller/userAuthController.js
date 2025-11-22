const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
module.exports = {
  createUser: async (req, res) => {
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegEx.test(req.body.email)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email format" });
    }
    const minPasswordLength = 8;
    if (req.body.password.length < minPasswordLength) {
      return res.status(400).json({
        status: false,
        message: `Password must be at least ${minPasswordLength} characters long`,
      });
    }
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({
          status: false,
          message: "User with this email already exists",
        });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userType: "User",
        password: hashedPassword,
      });
      await newUser.save();
      res
        .status(201)
        .json({ status: true, message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  },
  loginUser: async (req, res) => {
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegEx.test(req.body.email)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email format" });
    }
    const minPasswordLength = 8;
    if (req.body.password.length < minPasswordLength) {
      return res.status(400).json({
        status: false,
        message: `Password must be at least ${minPasswordLength} characters long`,
      });
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: "User not found" });
      }
      if (user && (await bcrypt.compare(req.body.password, user.password))) {
        const userToken = jwt.sign(
          { id: user._id, userType: user.userType, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        const { password, ...others } = user._doc;
        return res
          .status(200)
          .json({ status: true, accessToken: userToken, ...others });
      } else {
        return res
          .status(400)
          .json({ status: false, message: "Password is incorrect" });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  },
};
