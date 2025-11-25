const Application = require("../model/applicationModel");

module.exports = {
  createApplication: async (req, res) => {
    const { company, resume, vacancyId, userId } = req.body;
    if (!company || !resume || !vacancyId || !userId) {
      return res.status(400).json({
        status: false,
        message: "Please fill all the required fields",
      });
    }
    const applicationExist = await Application.findOne({
      vacancyId,
    });
    if (applicationExist) {
      return res
        .status(400)
        .json({ status: false, message: "Application already exists." });
    }
    try {
      const newApplication = new Application(req.body);
      await newApplication.save();
      return res
        .status(200)
        .json({ status: true, message: "Application submitted successfully" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  getApplicationsByVacancyId: async (req, res) => {
    const vacancyId = req.params.id;
    try {
      const applications = await Application.find({
        vacancyId,
      })
        .populate({
          path: "company",
          select: "name address logo email phoneNumber",
        })
        .populate({ path: "userId" })
        .populate({ path: "resume" })
        .populate({ path: "vacancyId" });
      return res.status(200).json({ status: true, applications: applications });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  getApplicationsByUserId: async (req, res) => {
    const userId = req.params.id;
    try {
      const applications = await Application.find({
        userId,
      })
        .populate({
          path: "company",
          select: "name address logo email phoneNumber",
        })
        .populate({ path: "userId" })
        .populate({ path: "resume" })
        .populate({ path: "vacancyId" });
      return res.status(200).json({ status: true, applications: applications });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  getApplicationsByCompanyId: async (req, res) => {
    const companyId = req.params.id;
    try {
      const applications = await Application.find({
        company: companyId,
      })
        .populate({
          path: "company",
          select: "name address logo email phoneNumber",
        })
        .populate({ path: "userId" })
        .populate({ path: "resume" })
        .populate({ path: "vacancyId" });
      return res.status(200).json({ status: true, applications: applications });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  updateUserApplication: async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    if (!["Pending", "Accepted", "Rejected"].includes(status)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid status provided" });
    }
    try {
      const applications = await Application.findByIdAndUpdate(
        id,
        {
          status: status,
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ status: true, message: "Application updated successfully" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  deleteUserApplication: async (req, res) => {
    const userId = req.params.id;
    try {
      await Application.findOneAndDelete({ userId });
      return res
        .status(200)
        .json({ status: true, message: "Application deleted successfully" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};
