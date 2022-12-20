const ApiFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const It = require("../models/itModel");
const multer = require("multer");
const AppError = require("../utils/appError");

const multerStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "../img");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `it-${req.user.id}-${Date.now()}.${ext}`);
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

exports.uploadItPhoto = upload.single("photo");

exports.allIt = catchAsync(async (req, res) => {
  const features = new ApiFeatures(It.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const it = await features.query;

  res.status(200).json({
    status: "success",
    total: it.length,
    data: it,
  });
});

exports.getIt = catchAsync(async (req, res) => {
  const it = await It.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: it,
  });
});

exports.createIt = catchAsync(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.photo = req.file.filename;

  const newIt = await It.create(data);
  res.status(201).json({
    status: "success",
    data: {
      it: newIt,
    },
  });
});
exports.updateIt = catchAsync(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.photo = req.file.filename;
  const it = await It.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: it,
  });
});

exports.deleteIt = catchAsync(async (req, res) => {
  await It.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
