const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);
const port = process.env.PORT || 3000;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful!"));
app.listen(port, () => {
  console.log("running");
});
