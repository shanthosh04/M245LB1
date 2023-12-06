const parkings = require("express").Router();

parkings.get("/", (req, res) => {
  res.json("Parkings works!");
});

parkings.post("/", (req, res) => {
  res.json("Parkings works!");
});

module.exports = parkings;
