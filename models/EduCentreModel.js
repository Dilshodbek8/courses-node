const mongoose = require("mongoose");
const EduSchema = new mongoose.Schema(
  {
    name_Uz: {
      type: String,
      trim: true,
      unique: true,
      // required: true,
      maxlength: [40, "Description must have less or equal 40"],
    },
    name_Ru: {
      type: String,
      trim: true,
      unique: true,
      // required: true,
      maxlength: [40, "Description must have less or equal 40"],
    },
    name_En: {
      type: String,
      trim: true,
      unique: true,
      // required: true,
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
      type: [
        {
          name: String,
          link: String,
        },
      ],
    },
    mainAddress: {
      type: String,
      // required: [true, "Edu Center must have a address"],
    },
    photo: String,

    ratingsAverage: {
      type: Number,
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    langs: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Languages",
      },
    ],
    subjects: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Subjects",
      },
    ],
    it: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "It",
      },
    ],
    other: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Other",
      },
    ],
    video: {
      type: String,
    },
    branches: [
      {
        name: String,
        address: String,
        phone: String,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
EduSchema.pre(/^find/, function (next) {
  this.populate({
    path: "langs",
    select: "-__v",
  })
    .populate({
      path: "subjects",
      select: "-__v",
    })
    .populate({
      path: "it",
      select: "-__v",
    })
    .populate({
      path: "other",
      select: "-__v",
    });

  next();
});
EduSchema.virtual("reviews", {
  ref: "Reviews",
  foreignField: "eduCenter",
  localField: "_id",
});

const EduCentre = mongoose.model("EduCentre", EduSchema);

module.exports = EduCentre;
