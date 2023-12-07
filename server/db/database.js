const fs = require("fs");

let conn = null;

const dbInit = async () => {
  conn = require("knex")({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "user",
      password: process.env.DB_PW || "123456",
      database: process.env.DB_NAME || "mydb",
    },
  });

  fs.readFile("./server/db/init.sql", "utf-8", (err, data) => {
    if (err) return console.error(err);
    const queries = data.split(";");
    queries.pop();
    queries.forEach(async (query) => await executeSQL(query));
  });
};

const executeSQL = async (query) => await conn.raw(query);

module.exports = { executeSQL, dbInit };
