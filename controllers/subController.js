const ApiFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const Subjects = require("./../models/subjectsModel");
exports.allSubjects = catchAsync(async (req, res) => {
  const features = new ApiFeatures(Subjects.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const sub = await features.query;

  res.status(200).json({
    status: "success",
    total: sub.length,
    data: sub,
  });
});
exports.getSub = catchAsync(async (req, res) => {
  const sub = await Subjects.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: sub,
  });
});

exports.createSub = catchAsync(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.photo = req.file.filename;
  const newSubject = await Subjects.create(data);
  res.status(201).json({
    status: "success",
    data: {
      subject: newSubject,
    },
  });
});

exports.updateSub = catchAsync(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.photo = req.file.filename;
  const sub = await Subjects.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: sub,
  });
});

exports.deleteSub = catchAsync(async (req, res) => {
  await Subjects.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
