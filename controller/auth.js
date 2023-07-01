// const express = require("express");
// const mysql = require("mysql");
// const bcrypt = require("bcryptjs");

// const app = express();

// // Creating DB Connection
// // const db = mysql.createConnection({
// //     host : process.env.DB_HOST,
// //     user : process.env.DB_USER,
// //     password: process.env.DB_PASSWORD,
// //     database: process.env.DATABASE
// // });

// // const db = mysql.createConnection(process.env.DATABASE_URL)
// // console.log('Connected to PlanetScale!')

// let db;

// try{
//     db = mysql.createConnection(process.env.DATABASE_URL)
//     console.log('Connected to PlanetScale!')
// } catch (error) {
//     console.error(error)
// }

// exports.register = (req, res) => {
//     console.log(req.body);

//     const name = req.body.name,
//         email = req.body.email,
//         password = req.body.password,
//         confirm_pass = req.body.c_password;

//     // const {name, email, password, confirm_pass} = req.body;

//     // Query Is Here
//     db.query('SELECT email FROM user WHERE name = ? AND email = ?', [name, email], async(error, results) => {
//         if(error){
//             console.log(error);
//         }
//         if(results.length > 0){
//             return res.render("register", {
//                 message: "That E-Mail is already been used."
//             })
//         }
//         else if(password !== confirm_pass){
//             return res.render('register', {
//                 message: "Passwords don't match."
//             });
//         }

//         // Hashing the password for security
//         let hashpassword = await bcrypt.hash(password, 10);
//         console.log(hashpassword);

//         db.query('INSERT INTO user SET ?', {name : name, email: email, password : hashpassword}, (error, results) => {
//             if(error){
//                 console.log(error);
//             }
//             else{
//                 console.log(results);
//                 return res.render('register', {
//                     message: 'user registered.'
//                 });
//             }
//         })
    
//     });
//     // res.send("Form Submitted");  // For checking
// }

// exports.login = (req, res) => {
//     const { email, password } = req.body;
  
//     // Find the user in the database
//     db.query(
//       'SELECT * FROM user WHERE email = ?',
//       [email],
//       (err, results) => {
//         if (err) {
//           throw err;
//         }
  
//         if (results.length > 0) {
//           const user = results[0];
  
//           // Compare the provided password with the hashed password
//           bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) {
//               throw err;
//             }
  
//             if (isMatch) {
//               // res.send('Login successful');
//               res.render("user_common_page");
//             } 
//             else {
//                 console.log(results);
//                 return res.render('user_common_page', {
//                     message: 'You have entered an incorrect password.'
//                 });
//                 email: '';
//                 password: '';
//             }
//           });
//         } 
//         else {
//             console.log(results);
//             return res.render('login', {
//                 message: 'There is no user of such name.'
//             });
//             email: '';
//             password: '';
//         }
//       }
//     );
// }


const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// Creating DB Connection
// const db = mysql.createConnection({
//     host : process.env.DB_HOST,
//     user : process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DATABASE
// });

// const db = mysql.createConnection(process.env.DATABASE_URL)
// console.log('Connected to PlanetScale!')

let db;

try {
    db = mysql.createConnection(process.env.DATABASE_URL)
    console.log('Connected to PlanetScale!')
} catch (error) {
    console.error(error)
}

// Register endpoint
exports.register = async (req, res) => {
    console.log(req.body);

    const name = req.body.name,
        email = req.body.email,
        password = req.body.password,
        confirm_pass = req.body.c_password;

    try {
        // Check if the email already exists in the database
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.render("register", {
                message: "That email is already in use."
            });
        }

        // Check if passwords match
        if (password !== confirm_pass) {
            return res.render("register", {
                message: "Passwords don't match."
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        // Insert the user into the database
        const user = { name, email, password: hashedPassword };
        await insertUser(user);

        return res.render("register", {
            message: "User registered."
        });
    } catch (error) {
        console.error(error);
        return res.render("register", {
            message: "An error occurred."
        });
    }
};

// Login endpoint
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user in the database
        const user = await getUserByEmail(email);
        if (!user) {
            return res.render("login", {
                message: "User not found."
            });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Generate JWT token
            const token = jwt.sign({ id: user.id }, "secret_key"); // Replace "secret_key" with your own secret key
            res.cookie("jwt", token, { httpOnly: true });

            // Redirect to the user common page
            return res.render("user_common_page");
        } else {
            return res.render("login", {
                message: "Incorrect password."
            });
        }
    } catch (error) {
        console.error(error);
        return res.render("login", {
            message: "An error occurred."
        });
    }
};

// Helper function to get user by email from the database
function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM user WHERE email = ?", [email], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}

// Helper function to insert a new user into the database
function insertUser(user) {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO user SET ?", user, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
