const router = require("express").Router();
const vacancyController = require("../controller/vacancyController");

router.post("/", vacancyController.createVacancy);

router.get("/search", vacancyController.searchVacancy);
router.get("/filter", vacancyController.filterVacany);
router.get("/VacancyByCategory/:id", vacancyController.getVacancyByCategory);
router.get("/:id", vacancyController.getVacancyById);
router.get("/", vacancyController.getAllVacancies);

module.exports = router;
