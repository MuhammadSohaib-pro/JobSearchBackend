const router = require("express").Router();
const resumeController = require("../controller/resumeController");
const { authenticateUser } = require("../middleware/middleware");

router.post("/", authenticateUser, resumeController.createResume);
router.get("/:id", authenticateUser, resumeController.getUserResume);
router.patch("/:id", authenticateUser, resumeController.updateUserResume);
router.delete("/:id", authenticateUser, resumeController.deleteUserResume);

module.exports = router;
