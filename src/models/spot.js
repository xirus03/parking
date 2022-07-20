const mongoose = require("mongoose");

const spotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  parking: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Parking",
  },
  rate: {
    type: mongoose.SchemaTypes.Number,
  },
  vehicle: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Vehicle",
  },
});

module.exports = mongoose.model("Spot", spotSchema);
