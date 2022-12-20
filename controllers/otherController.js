const ApiFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const Other = require("../models/otherModel");
const multer = require("multer");
const AppError = require("../utils/appError");

const multerStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "../img");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `other-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("please upload only images", 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadOtherPhoto = upload.single("photo");

exports.allOther = catchAsync(async (req, res) => {
  const features = new ApiFeatures(Other.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const other = await features.query;

  res.status(200).json({
    status: "success",
    total: other.length,
    data: other,
  });
});

exports.getOther = catchAsync(async (req, res) => {
  const other = await Other.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: other,
  });
});

exports.createOther = catchAsync(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.photo = req.file.filename;

  const newOther = await Other.create(data);
  res.status(201).json({
    status: "success",
    data: {
      other: newOther,
    },
  });
});
exports.updateOther = catchAsync(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.photo = req.file.filename;
  const other = await Other.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: other,
  });
});

exports.deleteOther = catchAsync(async (req, res) => {
  await Other.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
