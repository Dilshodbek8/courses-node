const express = require("express");
const router = express.Router();
const itControllers = require("../controllers/itController");
const authController = require("../controllers/authController");
router
  .route("/")
  .get(itControllers.allIt)
  .post(
    authController.protect,
    itControllers.uploadItPhoto,
    itControllers.createIt
  );

router
  .route("/:id")
  .get(itControllers.getIt)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    itControllers.uploadItPhoto,
    itControllers.updateIt
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    itControllers.deleteIt
  );

module.exports = router;
