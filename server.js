const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

(async function main() {
  mongoose.connect("mongodb://localhost:27017/parkings", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });
})();

app.use(cors({ origin: "*" }));
app.use(express.json());

const vehicleRouter = require("./src/routes/vehicle");
const spotRouter = require("./src/routes/spot");
const parkingsRouter = require("./src/routes/parkings");

app.use("/parkings", parkingsRouter);
app.use("/spots", spotRouter);
app.use("/vehicles", vehicleRouter);

app.listen(3000, () => console.log("server started."));
