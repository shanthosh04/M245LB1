const fs = require("fs");

let conn = null;

const dbInit = async () => {
  conn = require("mysql2").createConnection({
    database: process.env.DB_NAME || "mydb",
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PW || "toor",
    connectionLimit: 5,
  });

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
