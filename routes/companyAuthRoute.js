const router = require("express").Router();
const companyAuthController = require("../controller/companyAuthController");

router.post("/registerCompany", companyAuthController.createCompany);
router.post("/loginCompany", companyAuthController.loginCompany);

module.exports = router;
