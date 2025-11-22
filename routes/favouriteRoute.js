const router = require("express").Router();

const favouriteController = require("../controller/favouriteController");

router.post("/", favouriteController.addJobVacancyToFavourite);
router.get("/:id", favouriteController.getFavourites);
router.delete("/:id", favouriteController.deleteFavourite);

module.exports = router;
