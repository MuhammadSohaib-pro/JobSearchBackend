const mongoose = require("mongoose");
const uploadCategory = require("../middleware/uploadCategory");
const Category = require("../model/CategoryModel");
module.exports = {
  createCategory: async (req, res) => {
    uploadCategory(req, res, function (error) {
      if (error) {
        return res.status(500).json({ status: false, message: error.message });
      }
      const title = req.body.title;
      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
      if (!title || !path) {
        return res
          .status(400)
          .json({
            status: false,
            message: "Please fill the all the required fields",
          });
      }
      const newCategory = new Category({ title: title, image: path });
      try {
        newCategory.save();
        return res
          .status(201)
          .json({ status: true, message: "Category created successfully" });
      } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
      }
    });
  },
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      return res.status(200).json({ status: true, categories: categories });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const id = req.params.id;
      await Category.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ status: true, message: "Category deleted successfully" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};
