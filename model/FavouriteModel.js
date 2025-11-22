const mongoose = require("mongoose");

const favouriteModel = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
    vacancyId: { type: mongoose.Schema.ObjectId, required: true, ref: "Vacancy" },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        (ret.favouriteId = ret._id.toString()), delete ret._id;
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("Favourite", favouriteModel);
