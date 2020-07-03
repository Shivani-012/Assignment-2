// set-up app
const express = require("express");
const exphbs = require('express-handlebars');
const mealPackageDB = require("./model/mealPackages");

const app = express();

//Tells Express to set handlebars as its template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));

//Routes
app.get("/", (req,res)=>{

    const fakeDB = new mealPackageDB();

    res.render("home", {
        title : "Home Page",
        slogan : "Meals and grocery delivered.",
        packages : fakeDB.getTopPackages()
    });
});

app.get("/mealPackages", (req,res)=>{

    const fakeDB = new mealPackageDB();

    res.render("mealPackages", {
        title : "Meal Packages",
        slogan : "It's as easy as: Pick, Heat, Eat & Repeat!", 
        packages : fakeDB.getPackages()
    });
});

app.get("/registration", (req,res)=>{
    res.render("signup", {
        title : "Sign-up",
        slogan : "Meals and grocery delivered."
    });
});

app.get("/login", (req,res)=>{
    res.render("login", {
        title : "Log-in",
        slogan : "Meals and grocery delivered."
    });
});

//Web server creation
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log("Web server is up and running");
})