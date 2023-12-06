const users = require("express").Router();
const jwt = require("../jwt");
const { executeSQL } = require("../database");

users.get("/", (req, res) => {
  res.json("Users works!");
});

users.post("/login", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    birthday,
    password,
    street,
    streetnr,
    zip,
    phone,
  } = req.body;

  await executeSQL(`INSERT INTO users
  (email, firstname, lastname, street, streetnr, zip, birthday, phone, password) VALUES
  ('${[
    email,
    firstname,
    lastname,
    street,
    streetnr,
    zip,
    birthday,
    phone,
    password,
  ].join("','")}');
  `);

  res.json("OK");
});

users.post("/register", (req, res) => {
  res.json("Users works!");
});

module.exports = users;
