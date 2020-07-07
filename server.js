// set-up app
const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

//load the environment variable
require('dotenv').config({path:"./config/keys.env"})

const app = express();

//Tells Express to set handlebars as its template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//This tells express to make form data available via req.body in every request
app.use(bodyParser.urlencoded({ extended : false }));

app.use(express.static("public"));

//load controllers
const generalController = require("./controllers/general");

//map each controller to the app object
app.use("/", generalController);

//Web server creation
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log("Web server is up and running");
})