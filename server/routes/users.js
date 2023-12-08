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

  const existing = await executeSQL(
    `SELECT * FROM users WHERE email='${email}'`
  );

  if (existing.length > 0) return res.json({ err: "User already exists!" });

  const insert = await executeSQL(`INSERT INTO users
  (email, firstname, lastname, street, zip, birthday, phone, password, streetnr) VALUES
  ('${[email, firstname, lastname, street, zip, birthday, phone, password].join(
    "','"
  )}',${streetnr});`);

  const users = await executeSQL(`SELECT * FROM users WHERE email='${email}'`);

  const id = users[0].id;

  await executeSQL(`INSERT INTO roles (user, name) VALUES (${id}, 'Dozent')`);

  res.json("OK");
});

users.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const users = await executeSQL(`SELECT * FROM users WHERE email='${email}';`);

  const data = { ...users[0] };

  if (!data) return res.json({ err: "User doesn't exist!" });

  if (data.password !== password) return res.json({ err: "Login failed" });
  const token = jwt.sign({ data });
  res.json({ token });
});

module.exports = users;
