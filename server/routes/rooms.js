const rooms = require("express").Router();
const { executeSQL } = require("../db/database");
const { verify } = require("../jwt");

rooms.get("/", async (req, res) => {
  const allRooms = await executeSQL(`SELECT * FROM rooms;`);
  res.json(allRooms);
});

rooms.post("/", async (req, res) => {
  res.json("Rooms works!");
});

rooms.post("/reserve", async (req, res) => {
  const { token, roomName, dateFrom, dateTo } = req.body;

  const { decode, err } = verify(token);
  if (err) return res.json({ err });

  const { id } = decode.data;

  await executeSQL(`INSERT INTO room_reservations
  (user, room, reserved_from, reserved_to, status) VALUES
  (${id}, '${[roomName, dateFrom, dateTo, "available"].join("','")}');`);

  res.json("OK");
});

module.exports = rooms;
