require("dotenv").config();

const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

const ip = process.env.IP || "localhost";

const url = `http://${ip}:${port}/`;

app.use(express.json());

app.get("/", (req, res) => res.json("Server works!"));

app.use("/users", require("./routes/users"));
app.use("/rooms", require("./routes/rooms"));
app.use("/parkings", require("./routes/parkings"));

app.listen(port, () => console.log(`Server started on ${url}`));
