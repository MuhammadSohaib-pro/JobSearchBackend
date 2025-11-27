const router = require("express").Router();
const userAuthController = require("../controller/userAuthController");
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many login attempts",
});
router.post("/registerUser", userAuthController.createUser);
router.post("/loginUser", loginLimiter, userAuthController.loginUser);

module.exports = router;
