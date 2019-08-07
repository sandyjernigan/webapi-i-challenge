// libraries
const express = require('express');

// other files
const db = require('./data/db.js');

// global objects
const server = express();

// middleware
server.use(express.json());

// request handler
server.get('/', (req, res) => {
  const homePage = `<div  style="text-align: center;"><h1>Home Page</h1> <p><a href='/api/users'>Go to Users Page</a></p></div>`
  res.send(homePage);
});

// should be the last step
server.listen(5000, () => {
  console.log('Server is running on port 5000.');
});