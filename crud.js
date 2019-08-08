// remove(): the remove method accepts an id as it's first parameter and upon successfully deleting the user from the database it returns the number of records deleted.

// When the client makes a DELETE request to /api/users/:id:

//     If the user with the specified id is not found:
//         return HTTP status code 404 (Not Found).
//         return the following JSON object: { message: "The user with the specified ID does not exist." }.

//     If there's an error in removing the user from the database:
//         cancel the request.
//         respond with HTTP status code 500.
//         return the following JSON object: { error: "The user could not be removed" }.



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