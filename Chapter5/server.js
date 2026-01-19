import express from 'express';

// Initialize an express app and store in variable 'app'
const app = express();

//MIDDLEWARE
 // Set static folder
 app.use(express.static('public'));

 // Parse URL-encoded bodies (as sent by HTML forms)
 app.use(express.urlencoded ({ extended: true }));

 // Parse JSON bodies (as sent by API clients)
 app.use(express.json());
//=================================
// SUMMARY FROM Claude.ai

// Code Summary
// This is an Express.js POST endpoint (/email) that performs server-side email validation using HTMX.
// What it does:

// Receives an email address from a form submission
// Validates it against a regular expression pattern
// Returns HTML that replaces the form with inline validation feedback

// Flow:

// Extracts the submitted email from the request body
// Tests it against an email regex pattern
// If valid: Returns the form with a green success alert ("That email is valid")
// If invalid: Returns the form with a red danger alert ("Please enter a valid email address")

// Technology stack:

// Backend: Express.js
// Frontend: HTMX (for dynamic form updates without page refresh)
// Styling: Bootstrap (form-control, alert classes)

// Key behavior: The HTMX attributes (hx-target="this" and hx-swap="outerHTML") cause the entire form 
// div to be replaced with the server response, creating an interactive validation experience without
//  JavaScript.

//=================================
 // Handle POST request for email validation
 app.post('/email', (req, res) =>{
    const submittedEmail = req.body.email;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

   if(emailRegex.test(submittedEmail)) {
         return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
              <label class="form-label">Email address</label>
              <input
                type="email"
                class="form-control"
                name="email"
                hx-post="/email"
                value="${submittedEmail}"
                >
                <div class="alert alert-success" role="alert">
                    That email is valid
                </div>                 
            </div>`
        )
    }
    else{
        return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
            <label class="form-label">Email address</label>
            <input
                type="email"
                class="form-control"
                name="email"
                hx-post="/email"
                value="${submittedEmail}"
                >
                <div class="alert alert-danger" role="alert">
                    Please enter a valid email address
                </div>              
            </div>`
        )
    }
 });
  

 //Start the server
 const port = 3000;

 app.listen(port, ()=>{
 console. log(`Server listening on port ${port}`);
 });