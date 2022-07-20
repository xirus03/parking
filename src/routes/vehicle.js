const express = require("express");
const router = express.Router();
const VehicleController = require("../controllers/vehicle");

router.get("/", VehicleController.index);
router.get("/:id", VehicleController.get);
router.post("/", VehicleController.park);
router.delete("/:id", VehicleController.delete);

module.exports = router;
