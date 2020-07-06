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

app.post("/register", (req, res)=>{

    let flag = 0;
    const errors = [];
    const values = [];
    //const pswdRegEx = new RegExp("/^[a-z0-9]+$/");
    const pswdRegEx = /^[a-z0-9]+$/;
    const phoneNumRegEx = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

    if(req.body.fName==""){
        errors.push("* This field is required");
        values.push("");
    }
    else {
        errors.push("");
        values.push(req.body.fName);
    }

    if(req.body.lName==""){
        errors.push("* This field is required");
        values.push("");
    }
    else {
        errors.push("");
        values.push(req.body.lName);
    }

    if(req.body.email==""){
        errors.push("* This field is required");
        values.push("");
    }
    else {
        errors.push("");
        values.push(req.body.email);
    }

    if(req.body.password==""){
        errors.push("* This field is required");
        values.push("");
    }
    else if (pswdRegEx.test(req.body.password) == false){
        errors.push("* Password must only contain letters and numbers");
        values.push("");
    }
    else if ((req.body.password.length < 6 || req.body.password.length > 12)){
        errors.push("* Password must be between 6 and 12 characters");
        values.push("");
    }
    else {
        errors.push("");
        values.push(req.body.password);
    }

    if(req.body.phoneNum!=""){
        if (phoneNumRegEx.test(req.body.phoneNum) == false){
            errors.push('* Invalid phone number entered');
            errors.push("");
        }
        else{
            values.push(req.body.phoneNum);
        }
    }
    else {
        errors.push("");
        values.push("");
    }

    for (let i = 0; i < errors.length && flag == 0; i++){
        if (errors[i] != ""){
            res.render("signup", {
                title : "Sign-up",
                slogan : "Meals and grocery delivered.",
                fNameValue : values[0],
                fnameError : errors[0],
                lNameValue : values[1],
                lnameError : errors[1],
                emailValue : values[2],
                emailError : errors[2],
                pswdValue : values[3],
                pswdError : errors[3],
                phoneNumValue : values[4],
                phoneNumError : errors[4]
            });
            flag = 1;
        }
    }

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