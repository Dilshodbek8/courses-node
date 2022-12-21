const express = require("express");
const router = express.Router();
const eduCentreController = require("../controllers/eduCentreController");
const authController = require("./../controllers/authController");
router
  .route("/")
  .get(eduCentreController.allCentres)
  .post(
    authController.protect,
    eduCentreController.uploadEduPhoto,
    authController.restrictTo("admin"),
    eduCentreController.createCentre
  );

router
  .route("/:id")
  .get(eduCentreController.getCentre)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    eduCentreController.updateCentre
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    eduCentreController.deleteCentre
  );

module.exports = router;
