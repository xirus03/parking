const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  spots: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Spot" }],
});

module.exports = mongoose.model("Parking", parkingSchema);
