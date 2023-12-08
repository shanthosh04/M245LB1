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
  const { token, parkingnr, dateFrom, dateTo } = req.body;

  const { decode, err } = verify(token);
  if (err) return res.json({ err });

  const { id } = decode.data;

  await executeSQL(`INSERT INTO parking_reservations
  (user, parkingnr, reserved_from, reserved_to, status) VALUES
  (${id}, ${parkingnr}, '${[dateFrom, dateTo, "available"].join("','")}');`);

  res.json("OK");
});

module.exports = parkings;
