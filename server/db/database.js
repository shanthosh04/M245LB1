const fs = require("fs");

let pool = null;

const dbInit = async () => {
  pool = require("mariadb").createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "user",
    password: process.env.DB_PW || "123456",
    database: process.env.DB_NAME || "mydb",
  });

  fs.readFile("./server/db/init.sql", "utf-8", (err, data) => {
    if (err) return console.error(err);
    const queries = data.split(";");
    queries.pop();
    queries.forEach(async (query) => await executeSQL(query));
  });
};

const executeSQL = async (query) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(query);
    return res;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};

module.exports = { executeSQL, dbInit };
