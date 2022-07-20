const express = require("express");
const router = express.Router();
const ParkingController = require("../controllers/parking");

router.get("/", ParkingController.index);
router.get("/:id", ParkingController.get);
router.post("/", ParkingController.create);

module.exports = router;
