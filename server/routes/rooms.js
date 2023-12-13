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

rooms.post("/add", async (req, res) => {
  const { name, img, floor, roomType, spots } = req.body;
  await executeSQL(`INSERT INTO rooms
  (name, img, floor, room_type, spots) VALUES
  ('${[name, img, floor, roomType, spots].join("','")}')`);

  res.json("OK");
});

rooms.post("/reserve", async (req, res) => {
  const { token, roomName, dateFrom, timeFrom, timeTo } = req.body;

  const hourFrom = +timeFrom.split(":")[0];
  const hourTo = +timeTo.split(":")[0];

  if (18 < hourFrom || 18 < hourTo)
    return res.json({ err: "No reservations past 18:00" });

  const dupes = await executeSQL(`SELECT * FROM room_reservations WHERE 
  room='${roomName}' AND date='${dateFrom}' AND reserved_from='${timeFrom}' AND reserved_to='${timeTo}'`);

  if (dupes.length > 0) return res.json({ err: "Reservation already exists" });

  const { decode, err } = verify(token);
  if (err) return res.json({ err: "Token invalid" });

  const { id } = decode.data;

  await executeSQL(`INSERT INTO room_reservations
  (user, room, date, reserved_from, reserved_to) VALUES
  (${id}, '${[roomName, dateFrom, timeFrom, timeTo].join("','")}');`);

  res.json("OK");
});

module.exports = rooms;
