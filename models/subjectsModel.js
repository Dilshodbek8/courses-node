const mongoose = require("mongoose");

const SubjectsSchema = new mongoose.Schema({
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
const Subjects = mongoose.model("Subjects", SubjectsSchema);
module.exports = Subjects;
