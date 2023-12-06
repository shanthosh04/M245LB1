const users = require("express").Router();

users.get("/", (req, res) => {
  res.json("Users works!");
});

users.post("/login", (req, res) => {
  res.json("Users works!");
});

users.post("/register", (req, res) => {
  res.json("Users works!");
});

module.exports = users;
