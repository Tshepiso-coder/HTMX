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

//===================================
// SUMMARY FROM Claude.ai

// This code creates an Express.js POST endpoint that calculates Body Mass Index (BMI) and 
// returns a color-coded result:
// What it does:

// Accepts height and weight from the request body
// Calculates BMI using the formula: weight / (height × height)
// Returns an HTML response with the BMI value and category, color-coded based on the result:

// Gray: BMI ≤ 18.5 (Underweight)
// Green: BMI < 25 (Normal weight)
// Orange: BMI < 30 (Overweight)
// Red: BMI ≥ 30 (Obese)

//===================================


app.post("/calculate", (req, res) => {
  const height = parseFloat(req.body.height);
  const weight = parseFloat(req.body.weight);
  const bmi = weight / (height * height);
  if (bmi <= 18.5) {
     res.send(`
    <p>Height of ${height} & Weight of ${weight} gives you BMI of <span style="color:gray"><b>${bmi.toFixed(
      2
    )}</b> (Underweight)</span></p>
 `);
  } else if (bmi <25) {
    res.send(`
    <p>Height of ${height} & Weight of ${weight} gives you BMI of <span style="color:green"><b>${bmi.toFixed(
      2
    )}</b> (Normal weight)</span></p>
 `);}
 else if (bmi <30) {
    res.send(`
    <p>Height of ${height} & Weight of ${weight} gives you BMI of <span style="color:orange"><b>${bmi.toFixed(
      2
    )}</b> (Overweight)</span></p>
 `);} else  {
    res.send(`
    <p>Height of ${height} & Weight of ${weight} gives you BMI of <span style="color:red"><b>${bmi.toFixed(
      2
    )}(OBESE)</b> </span></p>
 `);}

});

// Start the server
const port = 5000
app.listen(port, () => {
  console.log(`Server listening on port ${port} `);
});
