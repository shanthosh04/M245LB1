const parkings = require("express").Router();
const { executeSQL } = require("../db/database");

parkings.get("/", (req, res) => {
  res.json("Parkings works!");
});

parkings.post("/", (req, res) => {
  res.json("Parkings works!");
});

parkings.post("/reserve", (req, res) => {
  res.json("Parkings works!");
});

module.exports = parkings;
