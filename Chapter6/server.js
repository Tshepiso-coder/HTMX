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
//=====================================
// SUMMARY FROM Claude.ai

// This code creates a simple Express.js server that implements an editable user profile using 
// HTMX for dynamic updates without page reloads.

// **Key components:**

// The server sets up three middleware functions: serving static files from a 'public' folder, 
// parsing form data from HTML forms, and parsing JSON request bodies.

// **Three route handlers:**

// 1. **GET /user/:id/edit** - Returns an HTML form pre-filled with user data (name: "Greg Lim" and bio). 
// The form uses HTMX attributes (hx-put, hx-target, hx-swap) to submit updates via PUT request and 
// replace itself with the response.

// 2. **PUT /user/:id** - Receives the form submission, extracts the name and bio from the request body, 
// and returns an updated profile card displaying the new information. The card includes a button to trigger 
// the edit form again.

// 3. **DELETE /delete** - Returns a simple confirmation message when called 
// (though this route appears incomplete as it doesn't delete anything specific).

// The app uses HTMX to create a seamless edit experience where clicking "Click To Edit" loads the form, 
// submitting saves the changes and displays the updated profile, and clicking "Cancel" returns to the 
// homepage—all without full page refreshes.

//=====================================

 
// Handle GET request for profile edit
 app.get('/user/:id/edit', (req, res) => {
 
    // send an HTML form for editing
    res.send(`
        <form hx-put="/user/1" hx-target="this" hx-swap="outerHTML">
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input 
                type="text" 
                class="form-control" 
                id="name" 
                name="name" value="Greg Lim">             
            </div>
            <div class="mb-3">
                <label for="bio" class="form-label">Bio</label>     
                <textarea 
                type="text" 
                class="form-control" 
                id="bio" 
                name="bio">Follower of Christ | Author of Best-selling Amazon Tech Books and Creator of Coding Courses
                </textarea>     
            </div>
        <button type="submit" class="btn btn-primary"> Save Changes </button>

        <button type="submit" hx-get="/index.html" class="btn btn-danger"> Cancel </button>       
 </form>             
 `);
 });

  
  // Handle PUT request for editing
  app.put('/user/:id', (req, res) => {
    const name = req.body.name;
    const bio = req.body.bio;
 
    // Send the updated profile back
    res.send(`
        <div class="card" style="width: 18rem;"
            hx-target="this"
            hx-swap="outerHTML"
        >
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">
                    ${bio}
                </p>
                <button href="#" class="btn btn-primary"
                    hx-get="/user/1/edit">               
                    Click To Edit
                </button>
                
            </div>
        </div> 
    `);
  });

  app.delete("/delete", (req, res) => {
    res.send("The item  has been deleted")
  })

 //Start the server
 const port = 3000;

 app.listen(port, ()=>{
 console. log(`Server listening on port ${port}`);
 });