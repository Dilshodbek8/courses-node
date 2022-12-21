const ApiFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const EduCentres = require("./../models/EduCentreModel");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "../img");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `edu-${req.user.id}-${Date.now()}.${ext}`);
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

exports.uploadEduPhoto = upload.single("photo");

exports.allCentres = catchAsync(async (req, res) => {
  const features = new ApiFeatures(EduCentres.find(), req.query)

    .filter()
    .sort()
    .limitFields()
    .paginate();
  const centre = await features.query;
  res.status(200).json({
    status: "success",
    total: centre.length,
    data: centre,
  });
});

exports.getCentre = catchAsync(async (req, res) => {
  const centre = await EduCentres.findById(req.params.id).populate("reviews");
  res.status(200).json({
    status: "success",
    data: centre,
  });
});

exports.createCentre = catchAsync(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.photo = req.file.filename;
  const newCentre = await EduCentres.create(data);

  res.status(201).json({
    status: "success",
    data: newCentre,
  });
});
exports.updateCentre = catchAsync(async (req, res) => {
  const centre = await EduCentres.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: centre,
  });
});

exports.deleteCentre = catchAsync(async (req, res) => {
  await EduCentres.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
