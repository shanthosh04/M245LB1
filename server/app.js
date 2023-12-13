require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;
const ip = process.env.IP || "localhost";
const url = `http://${ip}:${port}/`;

const { dbInit, executeSQL } = require("./db/database");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.json("Server works!"));

app.get("/seed", async (req, res) => {
  //   await runSQLfile("./server/db/seed.sql");

  await executeSQL(`INSERT INTO users 
  (email, firstname, lastname, street, streetnr, zip, birthday, phone, password) VALUES
  ("admin@csbe.ch","admin","admin","Zieglerstrasse",64,"3007","2000-01-01","079 420 42 69","admin");`);
  await executeSQL(`INSERT INTO roles
  (user, name) VALUES
  ((SELECT id FROM users WHERE email="admin@csbe.ch"), "Admin");`);

  const id = "SELECT id FROM users WHERE email='admin@csbe.ch'";
  const user = await executeSQL(
    `SELECT * FROM users WHERE email="admin@csbe.ch";`
  );
  const role = await executeSQL(`SELECT * FROM roles WHERE id=(${id});`);
  res.json({ user, role });
});

app.use("/users", require("./routes/users"));
app.use("/rooms", require("./routes/rooms"));
app.use("/parkings", require("./routes/parkings"));

dbInit().catch((err) => console.error(err));

app.listen(port, () => console.log(`Server started on ${url}`));
