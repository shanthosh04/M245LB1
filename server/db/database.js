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
    queries.forEach((query) => executeSQL(query));
  });
};

const executeSQL = (query) => {
  let output = "";
  conn
    .raw(query)
    .then((response) => {
      output = response;
    })
    .catch((err) => console.error(err));
  return output;
};

module.exports = { executeSQL, dbInit };
