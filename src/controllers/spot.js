const Spot = require("../models/spot");

exports.index = async (req, res) => {
  try {
    const spots = await Spot.find().populate("vehicle");
    res.json(spots);
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const spot = await Spot.findById(req.params.id);
    res.json(spot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const spot = new Spot({
      name: req.body.name,
      parking: req.body.parkingId,
      size: req.body.size,
      rate: req.body.rate,
    });
    const newSpot = await spot.save();

    res.status(201).send(newSpot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const spot = await Spot.deleteOne();
    res.json(spot);
  } catch (err) {
    res.json(500, { message: err.message });
  }
};
