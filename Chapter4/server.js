import express from 'express';

//==================================
// SUMMARY FROM Claude.ai

// This is an Express.js server that implements a contact search API endpoint. Here's what it does:
// Setup:

// Creates an Express application
// Configures middleware to serve static files from a 'public' folder
// Enables parsing of form data (URL-encoded) and JSON request bodies

// Main Functionality (/search endpoint):

// Accepts POST requests with a search term from the request body
// Returns an empty table row if no search term is provided
// Fetches a list of users from the JSONPlaceholder API (a fake REST API for testing)
// Filters users whose name or email contains the search term (case-insensitive)
// Returns HTML table rows (<tr>) for matching users, displaying their name and email
// The HTML response is designed to be injected directly into an existing table (likely using HTMX or similar)

// This appears to be part of a simple contact search feature where users can type a search query and 
// get real-time filtered results displayed in a table format.

//==================================

// Initialize an express app and store in variable 'app'
const app = express();

//MIDDLEWARE
 // Set static folder
 app.use(express.static('public'));

 // Parse URL-encoded bodies (as sent by HTML forms)
 app.use(express.urlencoded ({ extended: true }));

 // Parse JSON bodies (as sent by API clients)
 app.use(express.json());
  
// Handle POST request for contacts search
 app.post('/search', async(req, res) => { 
    const searchTerm = req.body.search.toLowerCase();   

    if(!searchTerm) {
        return res.send('<tr></tr>');
  }
 
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const users = await response.json()


    const searchResults = users.filter((user) =>{
        const name = user.name.toLowerCase();
        const email = user.email.toLowerCase();
 
        return name.includes(searchTerm) || email.includes(searchTerm)
    })
 
    const searchResultHtml = searchResultss
        .map((user) => `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
            </tr>
        `)
        .join("");
 
    res.send(searchResultHtml);  
 });
 const port = 3000;

 app.listen(port, ()=>{
 console. log(`Server listening on port ${port}`);
 });