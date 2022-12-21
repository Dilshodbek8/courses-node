const mongoose = require("mongoose");

const ItSchema = new mongoose.Schema({
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
const It = mongoose.model("It", ItSchema);
module.exports = It;
