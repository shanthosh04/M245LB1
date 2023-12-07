const rooms = require("express").Router();
const { executeSQL } = require("../db/database");

rooms.get("/", async (req, res) => {
  const allRooms = await executeSQL(`SELECT * FROM rooms;`);
  res.json(allRooms);
});

rooms.post("/", async (req, res) => {
  res.json("Rooms works!");
});

rooms.post("/reserve", (req, res) => {
  res.json("Rooms works!");
});

module.exports = rooms;
