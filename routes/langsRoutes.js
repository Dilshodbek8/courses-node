const express = require("express");
const router = express.Router();
const langsControllers = require("./../controllers/langsController");
const authController = require("./../controllers/authController");
router
  .route("/")
  .get(langsControllers.allLangs)
  .post(
    authController.protect,
    langsControllers.uploadLangPhoto,
    langsControllers.createLang
  );

router
  .route("/:id")
  .get(langsControllers.getLanguage)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "user"),
    langsControllers.uploadLangPhoto,
    langsControllers.updateLang
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    langsControllers.deleteLang
  );

module.exports = router;
