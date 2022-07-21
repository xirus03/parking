const { ObjectId } = require("mongodb");
const Spot = require("../models/spot");
const Parking = require("../models/parkings");

exports.index = async (req, res) => {
  try {
    const spots = await Spot.find().populate("vehicle").populate("parking");
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
    let spot = new Spot({
      name: req.body.name,
      parking: req.body.parkingId,
      size: req.body.size,
      rate: req.body.rate,
      parking: ObjectId(req.body.parking),
    });
    spot = await spot.save();
    const parking = await Parking.findOne({ _id: req.body.parking });
    parking.spots.push(ObjectId(spot._id));
    await parking.save();

    res.json(201, spot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const spot = await Spot.deleteOne({ _id: req.params.id });
    res.json(200, spot);
  } catch (err) {
    res.json(500, { message: err.message });
  }
};
