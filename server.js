// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8888;

//Sign up server
const server = app.listen(port, listening);

// Callback Function
function listening(){
    console.log("server running");
    console.log(`running on localhost: ${port}`);
};

//Get Data
app.get("/all", (req, res)=>{
    res.send(projectData);
});

//Post Data
app.post("/addData", addData);

function addData(req, res){
    projectData["date"]= req.body.date;
    projectData["temperature"]= req.body.temperature;
    projectData["feelings"]= req.body.feelings;
    
    res.send(projectData);
    console.log(`The data pushed is: ${newDate}`);
};