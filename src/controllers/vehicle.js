const { ObjectId } = require("mongodb");
const Vehicle = require("../models/vehicle");
const Spot = require("../models/spot");
const LogicService = require("../services/logicService");

exports.index = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.id }).populate(
      "spot"
    );

    res.json(vehicle);
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.park = async (req, res) => {
  try {
    let skip = false;
    const spot = await Spot.findById(req.body.spot);

    if (spot == null) {
      skip = true;
      res.json({ message: "Spot not found" });
    }

    if (spot.vehicle != null) {
      skip = true;
      res.json({ message: "Spot is not available" });
    }

    // check if vehicle is available to current spot
    if (!LogicService.checkIfFit(spot.size, req.body.size)) {
      skip = true;
      res.json({ message: "Vehicle will not fit." });
    }

    if (skip == true) return;

    const vehicle = new Vehicle({
      plateNo: req.body.plateNo,
      size: req.body.size,
      timeEntry: Date.now(),
      spot: ObjectId(req.body.spot),
    });

    const newVehicle = await vehicle.save();
    spot.vehicle = newVehicle;
    spot.save();

    res.json(newVehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    let response = {};
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id).populate(
      "spot"
    );

    response = { vehicle };

    if (vehicle != undefined) {
      const fee = LogicService.calculate(vehicle);
      response = { ...response, fee };
    }

    vehicle.spot.vehicle = null;
    await vehicle.spot.save();

    res.json(response);
  } catch (err) {
    res.json({ message: err.message });
  }
};
