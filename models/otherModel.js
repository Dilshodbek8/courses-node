const mongoose = require("mongoose");

const OtherSchema = new mongoose.Schema({
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
const Other = mongoose.model("Other", OtherSchema);
module.exports = Other;
