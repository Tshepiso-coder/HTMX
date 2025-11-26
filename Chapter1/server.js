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

// Handle GET request to fetch users.
app.get("/users", async (req, res) => {
  //   const users = [
  //     { id: 1, name: "John Doe" },
  //     { id: 2, name: "Bob Williams" },
  //     { id: 3, name: "Shannon Jackson" },
  //   ];

  setTimeout(() => {}, 5000);
  const limit = +req.query.limit || 5;

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

  set;
});
// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
