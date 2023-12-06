 let pool = null;

const dbInit = async () => {
  const mariadb = require("mariadb");
  pool = mariadb.createPool({
    database: process.env.DB_NAME || "mydb",
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "123456",
    connectionLimit: 5,
  });

  const userTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    streetnr int NOT NULL,
    zip VARCHAR(255) NOT NULL,
    birthday int NOT NULL,
    phone VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  );`;
  await executeSQL(userTableQuery);
  const roleTableQuery = `CREATE TABLE IF NOT EXISTS roles (
    id INT NOT NULL AUTO_INCREMENT,
    user int,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES users(id)
  );`;
  await executeSQL(roleTableQuery);
  const reservationTableQuery = `CREATE TABLE IF NOT EXISTS reservations (
    id INT NOT NULL AUTO_INCREMENT,
    user int,
    place VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    reserved_from VARCHAR(255) NOT NULL,
    reserved_to VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES users(id)
  );`;
  await executeSQL(reservationTableQuery);
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
