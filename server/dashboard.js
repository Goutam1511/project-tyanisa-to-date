// login.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const session = require('express-session');
const config = require('./config');

// Create a MySQL connection pool
const pool = mysql.createPool(config);

router.get('/', (req, res) => {
  // Perform a database query to check if the user exists
  pool.query(
    'SELECT * FROM dashboard',
    (error, results) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else if (results.length > 0) {
        // Login successful, create a session
        res.json(results);
      } else {
        res.sendStatus(401);
      }
    }
  );
});

module.exports = router;
