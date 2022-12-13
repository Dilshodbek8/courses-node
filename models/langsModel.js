const mongoose = require("mongoose");

const LangsSchema = new mongoose.Schema({
  name_Uz: {
    type: String,
    trim: true,
    unique: true,
  },
  name_Ru: {
    type: String,
    trim: true,
    unique: true,
  },
  name_En: {
    type: String,
    trim: true,
    unique: true,
  },
  photo: String,
});
const Languages = mongoose.model("Languages", LangsSchema);
module.exports = Languages;
