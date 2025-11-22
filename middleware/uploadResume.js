const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/resumes");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  const acceptableExtensions = [".docx", ".pdf", ".doc"];
  if (!acceptableExtensions.includes(path.extname(file.originalname))) {
    return callback(new Error("Only docx, pdf and doc are allowed"));
  }
  const fileSize = parseInt(req.headers["content-length"]);
  if (fileSize > 10048576) {
    return callback(new Error("File size is too large"));
  }
  callback(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  file: 10048576,
});

module.exports = upload.single("resume");
