const ApiFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const EduCentres = require("./../models/EduCentreModel");
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
  const centre = await EduCentres.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: centre,
  });
});

exports.createCentre = catchAsync(async (req, res) => {
  const newCentre = await EduCentres.create(req.body);
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
