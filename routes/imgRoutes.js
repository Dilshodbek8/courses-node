const express = require("express");
const router = express.Router();
const imgController = require("./../controllers/imgController");
router.route("/:imgId").get(imgController.getImg);

module.exports = router;
