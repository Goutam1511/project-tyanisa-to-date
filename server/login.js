// login.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const session = require('express-session');
const config = require('./config');

// Create a MySQL connection pool
const pool = mysql.createPool(config);

// Handle POST request to /api/login
router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Perform a database query to check if the user exists
  pool.query(
    'SELECT * FROM USER WHERE user = ? AND password = ?',
    [username, password],
    (error, results) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else if (results.length > 0) {
        // Login successful, create a session
        req.session.username = username;
        req.session.loggedIn = true;
        res.sendStatus(200);
      } else {
        // Login failed, return an error response
        res.sendStatus(401);
      }
    }
  );
});

module.exports = router;
