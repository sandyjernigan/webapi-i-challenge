// libraries
const express = require('express');

// other files
const db = require('./data/db.js');

// global objects
const server = express();

// middleware
server.use(express.json());
server.use(cors())

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

  // If the request body is missing the name or bio property:
  if(!newUser.name || !newUser.bio) {
    // cancel the request and respond with HTTP status code 400 (Bad Request)
    res.status(400).json({
      // return the following JSON response: { errorMessage: "Please provide name and bio for the user." }
      errorMessage: "Please provide name and bio for the user."
    })

    // If the information about the user is valid:
    } else { // save the new user the the database

      // When the client makes a POST request to /api/users:
      db.insert(newUser)
        // insert(): calling insert passing it a user object will add it to the database and return an object with the id of the inserted user. 
        // The object looks like this: { id: 123 }

        .then(added => {
          // return HTTP status code 201 (Created)
          // return the newly created user document
          res.status(201).json(newUser)
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
    }
})

// Read - GET - Returns an array of all the user objects contained in the database.
server.get('/api/users', (req, res) => {
  // When the client makes a GET request to /api/users:
  db.find() 
    // find(): calling find returns a promise that resolves to an array of all the users contained in the database.
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

// Read - GET - Returns the user object with the specified id.
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  // When the client makes a GET request to /api/users/:id:
  db.findById(id)
    // findById(): this method expects an id as it's only parameter and 
    // returns the user corresponding to the id provided or an empty array if no user with that id is found.
    .then(user => {
      if (user) {
        res.json(user)
      
      // If the user with the specified id is not found:
      } else {
        // return HTTP status code 404 (Not Found).
        res.status(404).json({
          // return the following JSON object: { message: "The user with the specified ID does not exist." }.
          message: "The user with the specified ID does not exist."
        })
      }
    })
    // If there's an error in retrieving the user from the database:
    .catch(err => {
      // cancel the request and respond with HTTP status code 500.
      res.status(500).json({
        err: err,
        // return the following JSON object: { error: "The user information could not be retrieved." }.
        error: "The user information could not be retrieved."
      })
    })
});

// Update - PUT - Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;

  // If the request body is missing the name or bio property:
  if(!user.name || !user.bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    })} else { 
    
  db.findById(id)
    .then(userByID => {
      if (userByID) { 
        // When the client makes a PUT request to /api/users/:id:
        db.update(id, user)
          // update(): accepts two arguments, the first is the id of the user to update and the second is an object with the changes to apply. 
          // It returns the count of updated records. If the count is 1 it means the record was updated correctly.
          .then(updated => {
            // If the user is found and the new information is valid:
            if (updated) {
              // update the user document in the database using the new information sent in the reques body.
              // return HTTP status code 200 (OK).
              // return the newly updated user document.
              res.json(user)
            } else {
              res.status(404).json({
                message: "The user with the specified ID does not exist."
              })
            }
          })
          // If there's an error when updating the user:
          .catch(err => {
            // respond with HTTP status code 500.
            res.status(500).json({
              err: err,
              // return the following JSON object: { error: "The user information could not be modified." }.
              error: "The user information could not be modified."
            })
          })
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }})
    .catch(err => { res.status(500).json({ err: err, error: "The user information could not be retrieved." })})
  }
});

// DELETE - Removes the user with the specified id and returns the deleted user.
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
  .then(user => {
    if (user) { 
      db.remove(id)
        // remove(): the remove method accepts an id as it's first parameter and upon successfully deleting the user from the database it returns the number of records deleted.
        .then(deleted => {
          res.json(user);
        })
        .catch(err => { // If there's an error in removing the user from the database:
          res.status(500).json({ // respond with HTTP status code 500.
            err: err,
            error: "The user could not be removed" // return the following JSON object: { error: "The user could not be removed" }
          })
        })
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    }})
  .catch(err => { res.status(500).json({ err: err, error: "The user information could not be retrieved." })})
});

// Setup Server Listen, this should be the last step
server.listen(5000, () => {
  console.log('Server is running on port 5000.');
});
