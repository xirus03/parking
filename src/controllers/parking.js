const Parking = require("../models/parkings");

exports.index = async (req, res) => {
  try {
    const parkings = await Parking.find().populate({
      path: "spots",
      populate: {
        path: "vehicle",
        model: "Vehicle",
      },
    });
    res.json(parkings);
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const parking = await Parking.findById(req.params.id);
    res.json(parking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const parking = new Parking({
      name: req.body.name,
    });
    const newParking = await parking.save();

    res.status(201).send(newParking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const parking = await Parking.deleteOne({ _id: req.params.id });

    res.status(201).send(parking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
