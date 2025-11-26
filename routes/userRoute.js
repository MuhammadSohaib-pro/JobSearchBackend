const router = require("express").Router();
const userController = require("../controller/userController");
const { authenticateUser } = require("../middleware/middleware");

router.get("/:id", authenticateUser, userController.getUserById);
router.patch("/:id", authenticateUser, userController.updateUser);
router.delete("/:id", authenticateUser, userController.deleteUserById);

module.exports = router;
