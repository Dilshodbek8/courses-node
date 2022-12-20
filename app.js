const express = require("express");
const app = express();
const langRoutes = require("./routes/langsRoutes");
const subRoutes = require("./routes/subRoutes");
const eduRoutes = require("./routes/eduRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");
const imgRoutes = require("./routes/imgRoutes");
const AppError = require("./utils/appError");
const globalError = require("./controllers/errorControllers");
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/v1/langs", langRoutes);
app.use("/api/v1/subjects", subRoutes);
app.use("/api/v1/edu", eduRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/img", imgRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});
app.use(globalError);
module.exports = app;
