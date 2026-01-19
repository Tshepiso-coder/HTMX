import express from 'express';

//================================
// SUMMARY FROM Claude.ai

// This code sets up a simple Express.js web server with the following functionality:
// Server Setup:

// Creates an Express application instance
// Configures three middleware components: static file serving from a 'public' folder, URL-encoded form data parsing, and JSON request body parsing

// Price Endpoint:

// Defines a single GET route at /get-price that simulates a fluctuating price
// Starts with an initial price of $60
// Each time the endpoint is called, it randomly adjusts the price up or down by a value between -1 and +1
// Returns the updated price as a string formatted to one decimal place (e.g., "$59.7")

// The price persists and changes with each request, making this useful for simulating real-time price updates

//================================

// Initialize an express app and store in variable 'app'
const app = express();

//MIDDLEWARE
 // Set static folder
 app.use(express.static('public'));

 // Parse URL-encoded bodies (as sent by HTML forms)
 app.use(express.urlencoded ({ extended: true }));

 // Parse JSON bodies (as sent by API clients)
 app.use(express.json());

 let currentPrice = 60;

 app.get('/get-price',(req,res)=>{
 currentPrice = currentPrice + Math.random() * 2 - 1;
 res.send('$' + currentPrice.toFixed(1))
 });

 const port = 3000;

 app.listen(port, ()=>{
 console. log(`Server listening on port ${port}`);
 });