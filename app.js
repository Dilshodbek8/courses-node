const express = require("express");
const app = express();
const langRoutes = require("./routes/langsRoutes");
const subRoutes = require("./routes/subRoutes");
const eduRoutes = require("./routes/eduRoutes");
const userRoutes = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalError = require("./controllers/errorControllers");
app.use(express.json());
app.use("/api/v1/langs", langRoutes);
app.use("/api/v1/subjects", subRoutes);
app.use("/api/v1/edu", eduRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/", (req, res) => {
  res.status(200).json({
    status: "success",
    data: "homepage",
  });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});
app.use(globalError);
module.exports = app;
