const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");

const app = express();

// Creating DB Connection
const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});


exports.register = (req, res) => {
    console.log(req.body);

    const name = req.body.name,
        email = req.body.email,
        password = req.body.password,
        confirm_pass = req.body.c_password;

    // const {name, email, password, confirm_pass} = req.body;

    // Query Is Here
    db.query('SELECT email FROM user WHERE name = ? AND email = ?', [name, email], async(error, results) => {
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            return res.render("register", {
                message: "That E-Mail is already been used."
            })
        }
        else if(password !== confirm_pass){
            return res.render('register', {
                message: "Passwords don't match."
            });
        }

        // Hashing the password for security
        let hashpassword = await bcrypt.hash(password, 10);
        console.log(hashpassword);

        db.query('INSERT INTO user SET ?', {name : name, email: email, password : hashpassword}, (error, results) => {
            if(error){
                console.log(error);
            }
            else{
                console.log(results);
                return res.render('register', {
                    message: 'user registered.'
                });
            }
        })
    
    });
    // res.send("Form Submitted");  // For checking
}

exports.login = (req, res) => {
    const { email, password } = req.body;
  
    // Find the user in the database
    db.query(
      'SELECT * FROM user WHERE email = ?',
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
  
        if (results.length > 0) {
          const user = results[0];
  
          // Compare the provided password with the hashed password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
  
            if (isMatch) {
              // res.send('Login successful');
              res.render("user_common_page");
            } 
            else {
                console.log(results);
                return res.render('login', {
                    message: 'You have entered an incorrect password.'
                });
                email: '';
                password: '';
            }
          });
        } 
        else {
            console.log(results);
            return res.render('login', {
                message: 'There is no user of such name.'
            });
            email: '';
            password: '';
        }
      }
    );
}

