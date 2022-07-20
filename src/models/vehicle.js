const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  plateNo: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  timeEntry: {
    type: Date,
  },
  timeExit: {
    type: Date,
  },
  spot: {
    type: mongoose.Types.ObjectId,
    ref: "Spot",
  },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
