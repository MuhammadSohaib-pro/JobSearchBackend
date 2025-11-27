const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const companyAuthController = require("../controller/companyAuthController");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many login attempts",
});

router.post("/registerCompany", companyAuthController.createCompany);
router.post("/loginCompany", loginLimiter, companyAuthController.loginCompany);

module.exports = router;
