const express = require("express");
const router = express.Router();
const SpotController = require("../controllers/spot");

router.get("/", SpotController.index);
router.get("/:id", SpotController.get);
router.post("/", SpotController.create);
// router.delete("/:id", SpotController.delete);

module.exports = router;
