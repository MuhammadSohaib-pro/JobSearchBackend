const router = require("express").Router();
const applicationController = require("../controller/applicationController");
const { authenticateUser } = require("../middleware/middleware");

router.post("/", authenticateUser, applicationController.createApplication);
router.get("/getApplicationsByVacancyId/:id", authenticateUser, applicationController.getApplicationsByVacancyId);
router.get("/getApplicationsByUserId/:id", authenticateUser, applicationController.getApplicationsByUserId);
router.get("/getApplicationsByCompanyId/:id", authenticateUser, applicationController.getApplicationsByCompanyId);
router.patch("/:id", authenticateUser, applicationController.updateUserApplication);
router.delete("/:id", authenticateUser, applicationController.deleteUserApplication);

module.exports = router;
