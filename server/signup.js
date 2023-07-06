const express = require('express');
const mysql = require('mysql');
const config = require('./config');

const router = express.Router();
const pool = mysql.createPool(config);

router.post('/', (req, res) => {
    const { username, password } = req.body;
  
    // Store the user in the database
    const user = { user: username, password : password };
    pool.query('INSERT INTO USER SET ?', user, (error, results) => {
      if (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
        
      // User created successfully
      res.sendStatus(201);
    });
  });
  
  module.exports = router;
  