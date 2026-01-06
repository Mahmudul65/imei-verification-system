import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "imei_db",
  password: "Your db password",
  port: 5000
});
