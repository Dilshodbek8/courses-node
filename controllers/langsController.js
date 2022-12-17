const ApiFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const Languages = require("./../models/langsModel");
const multer = require("multer");
const AppError = require("./../utils/appError");

const multerStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "../img");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `lang-${req.user.id}-${Date.now()}.${ext}`);
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

exports.uploadLangPhoto = upload.single("photo");

exports.allLangs = catchAsync(async (req, res) => {
  const features = new ApiFeatures(Languages.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const langs = await features.query;

  res.status(200).json({
    status: "success",
    total: langs.length,
    data: langs,
  });
});

exports.getLanguage = catchAsync(async (req, res) => {
  const language = await Languages.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: language,
  });
});

exports.createLang = catchAsync(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.photo = req.file.filename;

  const newLanguage = await Languages.create(data);
  res.status(201).json({
    status: "success",
    data: {
      language: newLanguage,
    },
  });
});
exports.updateLang = catchAsync(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.photo = req.file.filename;
  const language = await Languages.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: language,
  });
});

exports.deleteLang = catchAsync(async (req, res) => {
  await Languages.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
