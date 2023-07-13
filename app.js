// Import Necessary Libraries
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");

// Select the path for the .env file
dotenv.config({
    path: './.env'
});

const app = express();

// Creating DB Connection
const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});

// For accessing the CSS and JS and All other Assets
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parsing URL-Encoded Bodies as Sent by HTML Forms
app.use(express.urlencoded({ extended: false }));
// Parse JSON Bodies as Sent by HTML Forms
app.use(express.json());

// Setup the engine to load the front-end
app.set('view engine', 'hbs');

// DB connection
db.connect( (error) => {
    if(error){
        console.log(error)
    }
    else{
        console.log("MYsql Connected")
    }
})

// Defining Routes for Organizing The Pages
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/authentication'));
// Ends

app.listen(5500, () => {
    console.log("Connected on port.");
})