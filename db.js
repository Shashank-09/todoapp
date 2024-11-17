const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.log("DB Host:", process.env.DB_HOST);
    console.error('Database connection failed:', err.stack);
  } else {
    console.log('Connected to database.');
    connection.release(); // Release the connection back to the pool
  }
});

module.exports = pool;
