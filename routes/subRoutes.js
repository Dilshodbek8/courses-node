const express = require("express");
const router = express.Router();
const subController = require("../controllers/subController");
const authController = require("./../controllers/authController");

router
  .route("/")
  .get(subController.allSubjects)
  .post(subController.uploadSubPhoto, subController.createSub);

router
  .route("/:id")
  .get(subController.getSub)
  .patch(
    authController.protect,
    subController.uploadSubPhoto,
    authController.restrictTo("admin"),
    subController.updateSub
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    subController.deleteSub
  );

module.exports = router;
