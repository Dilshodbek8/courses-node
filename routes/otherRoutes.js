const express = require("express");
const router = express.Router();
const otherControllers = require("../controllers/otherController");
const authController = require("../controllers/authController");
router
  .route("/")
  .get(otherControllers.allOther)
  .post(
    authController.protect,
    otherControllers.uploadOtherPhoto,
    otherControllers.createOther
  );

router
  .route("/:id")
  .get(otherControllers.getOther)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    otherControllers.uploadOtherPhoto,
    otherControllers.updateOther
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    otherControllers.deleteOther
  );

module.exports = router;
