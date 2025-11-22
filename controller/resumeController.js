const fs = require("fs");
const path = require("path");
const Resume = require("../model/ResumeModel");
const uploadResume = require("../middleware/uploadResume");

module.exports = {
  createResume: async (req, res) => {
    uploadResume(req, res, function (error) {
      if (error) {
        res.status(500).json({ status: false, message: error.message });
      } else {
        const { userId, title } = req.body;
        const path =
          req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
        if (!userId || !path || !title) {
          res.status(400).json({
            status: false,
            message: "User ID, title, and file path are required.",
          });
        }

        const newResume = new Resume({
          userId: req.body.userId,
          resume: path,
          title: req.body.title,
        });

        try {
          newResume.save();
          res
            .status(201)
            .json({ status: true, message: "Resume created successfully." });
        } catch (error) {
          res.status(500).json({ status: false, message: error.message });
        }
      }
    });
  },
  getUserResume: async (req, res) => {
    const id = req.params.id;

    try {
      const resumes = await Resume.find({ userId: id });
      res.status(200).json(resumes);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  updateUserResume: async (req, res) => {
    uploadResume(req, res, async function (error) {
      try {
        if (error) {
          return res
            .status(500)
            .json({ status: false, message: error.message });
        }

        const id = req.params.id;

        const existingResume = await Resume.findById(id);
        if (!existingResume) {
          return res
            .status(404)
            .json({ status: false, message: "Resume not found" });
        }

        const updateData = {};

        // Update title
        if (req.body.title) updateData.title = req.body.title;

        // New file uploaded?
        if (req.file) {
          const newPath = req.file.path.replace(/\\/g, "/");
          updateData.resume = newPath;

          // Delete old file
          const oldFile = await path.join(process.cwd(), existingResume.resume);
          await fs.unlink(oldFile, (err) => {
            if (err) console.log("Failed to delete old resume:", err);
          });
        }

        await Resume.findByIdAndUpdate(id, updateData, { new: true });

        return res
          .status(200)
          .json({ status: true, message: "Resume updated successfully" });
      } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
      }
    });
  },

  deleteUserResume: async (req, res) => {
    const id = req.params.id;

    try {
      const resumes = await Resume.findByIdAndDelete(id);
      res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};
