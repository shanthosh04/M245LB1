const parkings = require("express").Router();
const { verify } = require("../jwt");
const { executeSQL } = require("../db/database");

parkings.get("/", (req, res) => {
  res.json("Parkings works!");
});

parkings.post("/", (req, res) => {
  res.json("Parkings works!");
});

parkings.post("/reserve", async (req, res) => {
  const { token, parkingnr, dateFrom, timeFrom, timeTo } = req.body;

  const hourFrom = +timeFrom.split(":")[0];
  const hourTo = +timeTo.split(":")[0];

  if (18 < hourFrom || 18 < hourTo)
    return res.json({ err: "No reservations past 18:00" });

  const { decode, err } = verify(token);
  if (err) return res.json({ err: "Token invalid" });

  const { id } = decode.data;

  await executeSQL(`INSERT INTO parking_reservations
  (user, parkingnr, date, reserved_from, reserved_to) VALUES
  (${id}, ${parkingnr}, '${[dateFrom, timeFrom, timeTo].join("','")}');`);

  res.json("OK");
});

module.exports = parkings;
