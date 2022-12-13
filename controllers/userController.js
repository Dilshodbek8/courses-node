const ApiFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const filterObj = (obj, ...rest) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (rest.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.allUser = catchAsync(async (req, res) => {
  const features = new ApiFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const user = await features.query;

  res.status(200).json({
    status: "success",
    total: user.length,
    data: user,
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log(req.user);
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError("You must change password in /updateMyPassword"),
      400
    );
  }
  const filteredBody = filterObj(req.body, "name", "email");
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});
