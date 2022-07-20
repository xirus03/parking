const moment = require("moment");

exports.checkIfFit = (spotSize, vehicleSize) => {
  const sizes = {
    Small: ["Small"],
    Medium: ["Small", "Medium"],
    Large: ["Small", "Medium", "Large"],
  };

  return sizes[spotSize].includes(vehicleSize);
};

exports.caculate = (vehicle) => {
  if (vehicle == null) return 0;

  const flatRate = 40;
  const rate = vehicle.spot.rate;
  const duration = getDuration(vehicle.timeEntry, Date.now());
  const hours = Math.round(duration / 60);

  if (hours < 3) return flatRate;

  const days = Math.floor(hours / 24);
  const exceedRate = days * 5000;
  return flatRate + rate * (hours % 24) + exceedRate;
};

const getDuration = (timeEntry, timeExit) => {
  const startTime = moment(timeExit);
  const exitTime = moment(timeEntry);

  startTime.add(24, "hours");

  const duration = startTime.diff(exitTime, "minutes");
  return duration;
};
