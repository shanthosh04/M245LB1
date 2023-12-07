const fs = require("fs");

let conn = null;

const dbInit = async () => {
  conn = require("mysql").createConnection({
    database: process.env.DB_NAME || "mydb",
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "user",
    password: process.env.DB_PW || "123456",
  });
  conn.connect();

  fs.readFile("./server/db/init.sql", "utf-8", async (err, data) => {
    if (err) return console.error(err);
    const queries = data.split(";");
    queries.pop();
    queries.forEach(async (query) => await executeSQL(query));
  });
};

const executeSQL = async (query) => {
  let output = "";
  conn.query(query, (err, results) => {
    if (err) return console.error(err);
    output = results;
  });
  return output;
};

module.exports = { executeSQL, dbInit };
