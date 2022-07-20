const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Parking", parkingSchema);
