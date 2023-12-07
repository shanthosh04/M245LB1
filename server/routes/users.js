const users = require("express").Router();
const jwt = require("../jwt");
const { executeSQL } = require("../db/database");

users.get("/", (req, res) => {
  res.json("Users works!");
});

users.post("/register", async (req, res) => {
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

users.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = await executeSQL(`SELECT * FROM users WHERE email='${email}';`);
  const data = users[0];
  if (!data) return res.json({ error: "User doesn't exist" });
  if (data.password !== password) return res.json({ error: "Login failed" });
  const token = jwt.sign({ data });
  res.json({ token });
});

module.exports = users;
