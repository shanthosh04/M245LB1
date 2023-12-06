const rooms = require("express").Router();

rooms.get("/", (req, res) => {
  res.json("Rooms works!");
});

rooms.post("/", (req, res) => {
  res.json("Rooms works!");
});

module.exports = rooms;
