const express = require('express');
const session = require('express-session');
const cors = require('cors');
const loginRouter = require('./login');
const signupRouter = require('./signup');
const DashBoardRouter = require('./dashboard');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: 'tyanisadatesgoutam',
    resave: false,
    saveUninitialized: true,
  })
);

// API routes
app.use('/api/login', loginRouter);
app.use('/api/signup', signupRouter);
app.use('/api/dashboard', DashBoardRouter)

// Serve the static files in the build folder
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all route to handle all other routes
app.get('*', (req, res) => {
    res.redirect('/homepage');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
