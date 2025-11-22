const router = require("express").Router();
const userAuthController = require("../controller/userAuthController");

router.post("/registerUser", userAuthController.createUser);
router.post("/loginUser", userAuthController.loginUser);

module.exports = router;
