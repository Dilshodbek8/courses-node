const mongoose = require("mongoose");

const EduSchema = new mongoose.Schema({
  name_Uz: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    maxlength: [40, "Description must have less or equal 40"],
  },
  name_Ru: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    maxlength: [40, "Description must have less or equal 40"],
  },
  name_En: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    maxlength: [40, "Description must have less or equal 40"],
  },
  description_Uz: {
    type: String,
    trim: true,
    maxlength: [300, "Description must have less or equal 300"],
  },
  description_Ru: {
    type: String,
    trim: true,
    maxlength: [300, "Description must have less or equal 300"],
  },
  description_En: {
    type: String,
    trim: true,
    maxlength: [300, "Description must have less or equal 300"],
  },
  isOnlineExists: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: Array,
  },
  links: {
    type: Array,
  },
  mainAddress: {
    type: String,
    required: [true, "Edu Center must have a address"],
  },
  address: {
    type: Array,
  },
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  langs: {
    type: mongoose.Schema.ObjectId,
    ref: "Languages",
  },
  subjects: {
    type: mongoose.Schema.ObjectId,
    ref: "Subjects",
  },
});
EduSchema.pre(/^find/, function (next) {
  this.populate({
    path: "langs",
    select: "-__v",
  });

  next();
});

const EduCentre = mongoose.model("EduCentre", EduSchema);

module.exports = EduCentre;
