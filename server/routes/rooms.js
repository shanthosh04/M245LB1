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

// rooms.post("/", async (req, res) => {

//   await executeSQL(`INSERT INTO rooms
//   () VALUES
//   ()`)

//   res.json("OK");
// });

rooms.post("/reserve", async (req, res) => {
  const { token, roomName, dateFrom, timeFrom, timeTo } = req.body;

  const { decode, err } = verify(token);
  if (err) return res.json({ err });

  const { id } = decode.data;

  await executeSQL(`INSERT INTO room_reservations
  (user, room, date, reserved_from, reserved_to) VALUES
  (${id}, '${[roomName, dateFrom, timeFrom, timeTo].join("','")}');`);

  res.json("OK");
});

module.exports = rooms;
