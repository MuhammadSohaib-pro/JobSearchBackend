const Company = require("../model/CompanyModel");
const fs = require("fs");
const path = require("path");
const uploadLogo = require("../middleware/uploadLogo");

module.exports = {
  getCompanyById: async (req, res) => {
    try {
      const id = req.params.id;
      const company = await Company.findById(id);
      const { password, __v, createdAt, ...companyData } = company._doc;
      return res
        .status(200)
        .json({ status: true, company: { ...companyData } });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  updateCompanyById: async (req, res) => {
    const id = req.params.id;
    uploadLogo(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ status: false, message: err.message });
      }
      const { name, siteLink, address, phoneNumber } = req.body;

      const existingCompany = await Company.findById(id);
      if (!existingCompany) {
        return res
          .status(404)
          .json({ status: false, message: "Company not found" });
      }
      const filePath =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
      const company = {
        name,
        siteLink,
        address,
        phoneNumber,
        logo: filePath || existingCompany.logo,
      };
      try {
        if (
          req.file &&
          existingCompany.logo &&
          typeof existingCompany.logo === "string" &&
          existingCompany.logo !== ""
        ) {
          const oldFile = path.join(process.cwd(), existingCompany.logo);

          fs.unlink(oldFile, (err) => {
            if (err) console.log("Failed to delete old company logo:", err);
          });
        }

        await Company.findByIdAndUpdate(id, company, { new: true });
        return res
          .status(200)
          .json({ status: true, message: "Company updated successfully" });
      } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
      }
    });
  },

  deleteCompanyById: async (req, res) => {
    try {
      const id = req.params.id;
      const existingCompany = await Company.findById(id);
      if (
        existingCompany.logo &&
        typeof existingCompany.logo === "string" &&
        existingCompany.logo !== ""
      ) {
        const oldFile = path.join(process.cwd(), existingCompany.logo);

        fs.unlink(oldFile, (err) => {
          if (err) console.log("Failed to delete old company logo:", err);
        });
      }
      await Company.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ status: true, message: "Company deleted successfully" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};
