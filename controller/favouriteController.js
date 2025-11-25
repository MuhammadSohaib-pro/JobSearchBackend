const Favourite = require("../model/FavouriteModel");

module.exports = {
  addJobVacancyToFavourite: async (req, res) => {
    const { vacancyId, userId } = req.body;

    if (!vacancyId || !userId) {
      return res.status(400).json({
        status: false,
        message: "Please provide both vacancyId and userId",
      });
    }

    try {
      const favourite = new Favourite(req.body);
      const favouriteExist = await Favourite.findOne({
        vacancyId: req.body.vacancyId,
      });
      if (favouriteExist) {
        return res.status(400).json({
          status: false,
          message: "Vacancy is already in favourites",
        });
      }
      await favourite.save();
      res.status(201).json({ status: true, message: "added to favourites" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  getFavourites: async (req, res) => {
    const id = req.params.id;
    try {
      const favourite = await Favourite.find({ userId: id }).populate({
        path: "vacancyId",
        select:
          "title description requirements skillTags experience salary benefits",
      });
      res.status(200).json({ status: true, favourite: favourite });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  deleteFavourite: async (req, res) => {
    const id = req.params.id;

    try {
      await Favourite.findByIdAndDelete(id);
      res
        .status(200)
        .json({ status: true, message: "Vacancy removed from favourites" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};
