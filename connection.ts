import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  database: "lostxfound",
  user: "root",
  password: "Shree@98",
});
