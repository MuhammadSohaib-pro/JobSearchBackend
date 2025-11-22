const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ status: false, message: "Authorization token missing" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ status: false, message: "Invalid or expired token" });
  }
};

const verifyUserType = (req, res, next) => {
  if (
    req.userType == "User" ||
    req.userType == "Admin" ||
    req.userType == "HiringCompany"
  ) {
    next();
  } else {
    return res
      .status(403)
      .json({ status: false, message: "Forbidden: Invalid user type" });
  }
};

const verifyAdminType = (req, res, next) => {
  if (req.userType == "Admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ status: false, message: "Forbidden: Invalid user type" });
  }
};

module.exports = { authenticateUser, verifyUserType, verifyAdminType };
