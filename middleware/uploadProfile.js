const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/profile");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  const acceptableExtensions = [".jpg", ".png", ".jpeg"];
  if (!acceptableExtensions.includes(path.extname(file.originalname))) {
    return callback(new Error("Only jpg, png and jpeg are allowed"));
  }
  const fileSize = parseInt(req.headers["content-length"]);
  if (fileSize > 1048576) {
    return callback(new Error("File size is too large"));
  }
  callback(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  file: 1048576,
});

module.exports = upload.single("image");
