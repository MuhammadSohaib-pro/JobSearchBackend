const express = require("express");
const app = express();
const dotenv = require("dotenv");

const userAuthRoute = require("./routes/userAuthRoute");
const companyAuthRoute = require("./routes/companyAuthRoute");
const categoryRoute = require("./routes/categoryRoute");
const vacancyRoute = require("./routes/vacancyRoute");
const favouriteRoute = require("./routes/favouriteRoute");
const resumeRoute = require("./routes/resumeRoute");
const applicationRoute = require("./routes/applicationRoute");
const userRoute = require("./routes/userRoute");
const mongoose = require("mongoose");
dotenv.config();

const PORT = process.env.PORT;
const DB = process.env.DB;

mongoose
  .connect(DB)
  .then(() => console.log("Database is connected successfully!"))
  .catch((err) =>
    console.log("Error Occured while connecting to database", err)
  );

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/", userAuthRoute);
app.use("/api/", companyAuthRoute);
app.use("/api/categories/", categoryRoute);
app.use("/api/vacancies/", vacancyRoute);
app.use("/api/favourites/", favouriteRoute);
app.use("/api/resumes", resumeRoute);
app.use("/api/applications", applicationRoute);
app.use("/api/users", userRoute);

//for accessing uploads directory in browser
app.use("/uploads", express.static("uploads"));

app.listen(PORT || 6013, console.log(`App is running on port: ${PORT}`));
