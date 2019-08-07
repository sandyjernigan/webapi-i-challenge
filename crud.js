
// DELETE /api/users/:id 	Removes the user with the specified id and returns the deleted user.
// PUT    /api/users/:id 	Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.

// Database access will be done using the db.js file included inside the data folder. This file publishes the following methods:

  // update(): accepts two arguments, the first is the id of the user to update and the second is an object with the changes to apply. 
  // It returns the count of updated records. If the count is 1 it means the record was updated correctly.
// remove(): the remove method accepts an id as it's first parameter and upon successfully deleting the user from the database it returns the number of records deleted.


// Endpoint Specifications
// ______________________________________________________________________________________________________



// When the client makes a DELETE request to /api/users/:id:

//     If the user with the specified id is not found:
//         return HTTP status code 404 (Not Found).
//         return the following JSON object: { message: "The user with the specified ID does not exist." }.

//     If there's an error in removing the user from the database:
//         cancel the request.
//         respond with HTTP status code 500.
//         return the following JSON object: { error: "The user could not be removed" }.

// When the client makes a PUT request to /api/users/:id:

//     If the user with the specified id is not found:
//         return HTTP status code 404 (Not Found).
//         return the following JSON object: { message: "The user with the specified ID does not exist." }.

//     If the request body is missing the name or bio property:
//         cancel the request.
//         respond with HTTP status code 400 (Bad Request).
//         return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.

//     If there's an error when updating the user:
//         cancel the request.
//         respond with HTTP status code 500.
//         return the following JSON object: { error: "The user information could not be modified." }.

//     If the user is found and the new information is valid:
//         update the user document in the database using the new information sent in the reques body.
//         return HTTP status code 200 (OK).
//         return the newly updated user document.

// Stretch Problems

// To work on the stretch problems you'll need to enable the cors middleware. Follow these steps:

//     add the cors npm module: yarn add cors or npm i cors.
//     add server.use(cors()) after server.use(express.json()).

// Create a new React application and connect it to your server:

//     the React application can be anywhere, but, for this project create it inside the folder for the solution.
//     connect to the /api/users endpoint in the API and show the list of users.
//     add a delete button to each displayed user that will remove it from the server.
//     add forms to add and update data.
//     Style the list of users however you see fit.