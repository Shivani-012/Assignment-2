const express = require('express');
const router = express.Router();

const mealPackageDB = require("../model/mealPackages");

//home route
router.get("/", (req,res)=>{

    const fakeDB = new mealPackageDB();

    res.render("home", {
        title : "Home Page",
        slogan : "Meals and grocery delivered.",
        packages : fakeDB.getTopPackages()
    });
});

//meal package page route
router.get("/mealPackages", (req,res)=>{

    const fakeDB = new mealPackageDB();

    res.render("mealPackages", {
        title : "Meal Packages",
        slogan : "It's as easy as: Pick, Heat, Eat & Repeat!", 
        packages : fakeDB.getPackages()
    });
});

//registration page route that handles GET request
router.get("/registration", (req,res)=>{
    res.render("signup", {
        title : "Sign-up",
        slogan : "Meals and grocery delivered."
    });
});

//registration page route that handles POST request from form submission
router.post("/register", (req, res)=>{

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
    if (flag == 0){

        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
            to: req.body.email,
            from: 'ssingh927@myseneca.ca',
            subject: 'Welcome to LiveFit Foods!',
            html: `<strong>Dear ${req.body.fName} ${req.body.lName},<br>Thanks for joining our meal package family!</strong>`,
        };
        sgMail.send(msg)
        .then()
        .catch(err=>{
            console.log(`Error ${err}`);
        })

        res.render("dashboard", {
            title : "Dashboard",
            slogan : "Welcome to LiveFit Foods!",
            fName : values[0],
            lName : values[1]
        });
    }

});

//login page route that handles GET request
router.get("/login", (req,res)=>{
    res.render("login", {
        title : "Log-in",
        slogan : "Meals and grocery delivered."
    });
});

//login page route that handle POST request from form submission
router.post("/login", (req, res)=>{

    let flag = 0;
    const errors = [];
    const values = [];

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
    else {
        errors.push("");
        values.push(req.body.password);
    }

    for (let i = 0; i < errors.length && flag == 0; i++){
        if (errors[i] != ""){
            res.render("login", {
                title : "Log-in",
                slogan : "Meals and grocery delivered.",
                emailValue : values[0],
                emailError : errors[0],
                pswdValue : values[1],
                pswdError : errors[1]
            });
            flag = 1;
        }
    }

});

module.exports = router;