import express from "express";

// Initialise an express app and stored in variable app
const app = express();

//MIDDLEWARE
// Set static folder
app.use(express.static("public"));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//======================================
// SUMMARY FROM claude.ai

// Here's a summary of the code:
// Purpose
// An Express.js API endpoint that fetches and displays a list of users with an artificial 2-second delay.
// What it does:

// Route: Creates a GET endpoint at /users
// Delay simulation: Uses setTimeout to wait 2 seconds before processing (mimicking a slow database or API call)
// Query parameter: Accepts an optional limit parameter to control how many users to fetch (defaults to 3)
// External API call: Fetches user data from JSONPlaceholder API (https://jsonplaceholder.typicode.com/users)
// Response: Returns HTML containing:

// An <h2> heading "Users"
// An unordered list with Bootstrap styling

//======================================


// Handle GET request to fetch users.
app.get("/users", async (req, res) => {
  //   const users = [
  //     { id: 1, name: "John Doe" },
  //     { id: 2, name: "Bob Williams" },
  //     { id: 3, name: "Shannon Jackson" },
  //   ];

  // empty setTimeout to mimic delay of 2 second
  setTimeout( async () => {

  const limit = +req.query.limit || 3;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
  );

  const users = await response.json();

  res.send(`
 <h2>Users</h2>
 <ul class="list-group">
 ${users
   .map((user) => `<li class="list-group-item">${user.name}</li>`)
   .join("")}
 </ul>
 `);
  }, 2000);

});
// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
