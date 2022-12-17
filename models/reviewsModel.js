const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      require: [true, "Review can not be empty"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    eduCenter: {
      type: mongoose.Schema.ObjectId,
      ref: "EduCentre",
      require: [true, "Review must belong to a Education center"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
ReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});
const Reviews = mongoose.model("Reviews", ReviewSchema);
module.exports = Reviews;
