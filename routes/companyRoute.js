const router = require("express").Router();
const companyController = require("../controller/companyController");
const { authenticateUser } = require("../middleware/middleware");

router.get("/:id", authenticateUser, companyController.getCompanyById);
router.patch("/:id", authenticateUser, companyController.updateCompanyById);
router.delete("/:id", authenticateUser, companyController.deleteCompanyById);

module.exports = router;
