// set-up app
const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mealPackageDB = require("./model/mealPackages");

const app = express();

//Tells Express to set handlebars as its template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));

//This tells express to make form data available via req.body in every request
app.use(bodyParser.urlencoded({ extended : false }));

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

app.post("/login", (req, res)=>{

    let flag = 0;
    const errors = [];

    if(req.body.email==""){
        errors.push("* This field is required");
    }
    else {
        errors.push("");
    }

    if(req.body.password==""){
        errors.push("* This field is required");
    }
    else {
        errors.push("");
    }

    for (let i = 0; i < errors.length && flag == 0; i++){
        if (errors[i] != ""){
            res.render("login", {
                title : "Log-in",
                slogan : "Meals and grocery delivered.",
                emailError : errors[0],
                pswdError : errors[1]
            });
            flag = 1;
        }
    }

});

//Web server creation
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log("Web server is up and running");
})