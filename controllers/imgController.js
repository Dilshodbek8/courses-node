const catchAsync = require("./../utils/catchAsync");
exports.getImg = catchAsync(async (req, res) => {
  const img = req.params.imgId;
  res.status(200).sendFile(img, { root: "../img" });
});
