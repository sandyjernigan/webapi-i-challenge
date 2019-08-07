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

// User Schema - Users in the database conform to the following object structure:
  const userSchema = {
    "name": "Jane Doe", // String, required
    "bio": "Not Tarzan's Wife, another Jane",  // String
    //"created_at": Mon Aug 14 2017 12:50:16 GMT-0700 (PDT), // Date, defaults to current date
    //"updated_at": Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
  }

// Create - POST - Creates a user using the information sent inside the request body.
server.post('/api/users', (req, res) => {
  const newUser = req.body;

  // When the client makes a POST request to /api/users:
  db.insert(newUser)
    // insert(): calling insert passing it a user object will add it to the database and return an object with the id of the inserted user. 
    // The object looks like this: { id: 123 }

    .then(user => {

      // If the request body is missing the name or bio property:
      if(!user.name || !user.bio) {
        // cancel the request and respond with HTTP status code 400 (Bad Request)
        res.status(400).json({
          // return the following JSON response: { errorMessage: "Please provide name and bio for the user." }
          errorMessage: "Please provide name and bio for the user."
        })

      // If the information about the user is valid:
      } else if(user) {
        // save the new user the the database
        // return HTTP status code 201 (Created)
        // return the newly created user document
        res.status(201).json(user)

      // Else
      } else {
        res.status(412).json({
          message: `No Information <img src='https://http.cat/412' alt='Precondition Failed' />`
        })
      }
    })
    
    // If there's an error while saving the user:
    .catch(err => {
      // cancel the request and respond with HTTP status code 500 (Server Error)
      res.status(500).json({
        err: err,
        // return the following JSON object: { error: "There was an error while saving the user to the database" }.
        message: 'failed to create new user'
      })
    })
})

// Read - GET - Returns an array of all the user objects contained in the database.
server.get('/api/users', (req, res) => {
  // When the client makes a GET request to /api/users:
  db.find() // find(): calling find returns a promise that resolves to an array of all the users contained in the database.
    .then(hubs => {
      res.json(hubs);
    })
    // If there's an error in retrieving the users from the database:
    .catch(err => {
      // cancel the request and  respond with HTTP status code 500.
      res.status(500).json({
        err: err,
        // return the following JSON object: { error: "The users information could not be retrieved." }.
        error: "The users information could not be retrieved." 
      })
    })
})




// Setup Server Listen, this should be the last step
server.listen(5000, () => {
  console.log('Server is running on port 5000.');
});