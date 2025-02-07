// const express = require("express");
// const mysql = require("mysql");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

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

// try {
//     db = mysql.createConnection(process.env.DATABASE_URL)
//     console.log('Connected to PlanetScale!')
// } catch (error) {
//     console.error(error)
// }

// // Register endpoint
// exports.register = async (req, res) => {
//     console.log(req.body);

//     const name = req.body.name,
//         email = req.body.email,
//         password = req.body.password,
//         confirm_pass = req.body.c_password;

//     try {
//         // Check if the email already exists in the database
//         const existingUser = await getUserByEmail(email);
//         if (existingUser) {
//             return res.render("register", {
//                 message: "That email is already in use."
//             });
//         }

//         // Check if passwords match
//         if (password !== confirm_pass) {
//             return res.render("register", {
//                 message: "Passwords don't match."
//             });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);
//         console.log(hashedPassword);

//         // Insert the user into the database
//         const user = { name, email, password: hashedPassword };
//         await insertUser(user);

//         return res.render("register", {
//             message: "User registered."
//         });
//     } catch (error) {
//         console.error(error);
//         return res.render("register", {
//             message: "An error occurred."
//         });
//     }
// };

// // Login endpoint
// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find the user in the database
//         const user = await getUserByEmail(email);
//         if (!user) {
//             return res.render("login", {
//                 message: "User not found."
//             });
//         }

//         // Compare the provided password with the hashed password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (isMatch) {
//             // Generate JWT token
//             const token = jwt.sign({ id: user.id }, "secret_key"); // Replace "secret_key" with your own secret key
//             res.cookie("jwt", token, { httpOnly: true });

//             // Redirect to the user common page
//             return res.render("user_common_page");
//         } else {
//             return res.render("login", {
//                 message: "Incorrect password."
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.render("login", {
//             message: "An error occurred."
//         });
//     }
// };

// // Helper function to get user by email from the database
// function getUserByEmail(email) {
//     return new Promise((resolve, reject) => {
//         db.query("SELECT * FROM user WHERE email = ?", [email], (error, results) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(results[0]);
//             }
//         });
//     });
// }

// // Helper function to insert a new user into the database
// function insertUser(user) {
//     return new Promise((resolve, reject) => {
//         db.query("INSERT INTO user SET ?", user, (error, results) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(results);
//             }
//         });
//     });
// }

const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Creating DB Connection
let db;

try {
  db = mysql.createConnection(process.env.DATABASE_URL);
  console.log('Connected to PlanetScale!');
} catch (error) {
  console.error(error);
}

// Register endpoint
exports.register = async (req, res) => {
  const { name, email, password, c_password } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.render('register', {
        message: 'That email is already in use.',
      });
    }

    // Check if passwords match
    if (password !== c_password) {
      return res.render('register', {
        message: "Passwords don't match.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const user = { name, email, password: hashedPassword };
    await insertUser(user);

    return res.render('register', {
      message: 'User registered.',
    });
  } catch (error) {
    console.error(error);
    return res.render('register', {
      message: 'An error occurred.',
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
      return res.render('login', {
        message: 'User not found.',
      });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      if (email === 'admin@gmail.com' && password === 'admin') {
        // Generate JWT token
        const token = jwt.sign(
          { email: user.email },
          process.env.JWT_SECRET_KEY,
        );
        res.cookie('token', token, { httpOnly: true });

        // Redirect to the special page
        return res.redirect('/admin_home');
      }
      // Generate JWT token
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY);
      res.cookie('token', token, { httpOnly: true });

      // Redirect to the user dashboard
      return res.redirect('/user_common_page');
    } else {
      return res.render('login', {
        message: 'Incorrect password.',
      });
    }
  } catch (error) {
    console.error(error);
    return res.render('login', {
      message: 'An error occurred.',
    });
  }
};

// User Information Fetching IN Every Pages
// Dashboard endpoint
exports.admin_home = async (req, res, next) => {
  try {
    // Get the user ID from the JWT token
    const email = req.email;

    // Fetch the user's information from the database
    const profile = await getUserByEmail(email);

    // Render the dashboard view with the user information
    return res.render('admin_home', { profile });
  } catch (error) {
    console.error(error);
    return res.render('admin_home', {
      message: 'An error occurred.',
    });
  }
};

exports.admin_view = async (req, res, next) => {
  try {
    // Get the user ID from the JWT token
    const email = req.email;

    // Fetch the user's information from the database
    const profile = await getUserByEmail(email);

    // Render the dashboard view with the user information
    return res.render('admin_view', { profile });
  } catch (error) {
    console.error(error);
    return res.render('admin_view', {
      message: 'An error occurred.',
    });
  }
};

exports.course_upload = async (req, res, next) => {
  try {
    // Get the user ID from the JWT token
    const email = req.email;

    // Fetch the user's information from the database
    const profile = await getUserByEmail(email);

    // Render the dashboard view with the user information
    return res.render('course_upload', { profile });
  } catch (error) {
    console.error(error);
    return res.render('course_upload', {
      message: 'An error occurred.',
    });
  }
};

exports.courseDetails = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('courseDetails', { profile });
  } catch (error) {
    console.error(error);
    return res.render('courseDetails', {
      message: 'An error occurred.',
    });
  }
};

exports.dashboard = async (req, res, next) => {
  try {
    // Get the user ID from the JWT token
    const email = req.email;

    // Fetch the user's information from the database
    const profile = await getUserByEmail(email);

    // Render the dashboard view with the user information
    return res.render('dashboard', { profile });
  } catch (error) {
    console.error(error);
    return res.render('dashboard', {
      message: 'An error occurred.',
    });
  }
};

exports.upload = async (req, res, next) => {
  try {
    // Get the user ID from the JWT token
    const email = req.email;

    // Fetch the user's information from the database
    const profile = await getUserByEmail(email);

    // Render the dashboard view with the user information
    return res.render('course_upload', { profile });
  } catch (error) {
    console.error(error);
    return res.render('course_upload', {
      message: 'An error occurred.',
    });
  }
};

exports.facts_animal = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('facts_animal', { profile });
  } catch (error) {
    console.error(error);
    return res.render('facts_animal', {
      message: 'An error occurred.',
    });
  }
};

exports.facts_earth = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('facts_earth', { profile });
  } catch (error) {
    console.error(error);
    return res.render('facts_earth', {
      message: 'An error occurred.',
    });
  }
};

exports.facts_math = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('facts_math', { profile });
  } catch (error) {
    console.error(error);
    return res.render('facts_math', {
      message: 'An error occurred.',
    });
  }
};

exports.facts_nature = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('facts_nature', { profile });
  } catch (error) {
    console.error(error);
    return res.render('facts_nature', {
      message: 'An error occurred.',
    });
  }
};

exports.facts_planet = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('facts_planet', { profile });
  } catch (error) {
    console.error(error);
    return res.render('facts_planet', {
      message: 'An error occurred.',
    });
  }
};

exports.facts_science = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('facts_science', { profile });
  } catch (error) {
    console.error(error);
    return res.render('facts_science', {
      message: 'An error occurred.',
    });
  }
};

exports.facts_scientist = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('facts_scientist', { profile });
  } catch (error) {
    console.error(error);
    return res.render('facts_scientist', {
      message: 'An error occurred.',
    });
  }
};

exports.facts_tech = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('facts_tech', { profile });
  } catch (error) {
    console.error(error);
    return res.render('facts_tech', {
      message: 'An error occurred.',
    });
  }
};

exports.user_common_page = async (req, res, next) => {
  try {
    // Get the user ID from the JWT token
    const email = req.email;

    // Fetch the user's information from the database
    const profile = await getUserByEmail(email);
    console.log(profile.name);

    // Render the dashboard view with the user information
    return res.render('user_common_page', { profile });
  } catch (error) {
    console.error(error);
    return res.render('user_common_page', {
      message: 'An error occurred.',
    });
  }
};

exports.formulae_home = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('formulae-home', { profile });
  } catch (error) {
    console.error(error);
    return res.render('formulae-home', {
      message: 'An error occurred.',
    });
  }
};

exports.formula_chemistry = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('formula-chemistry', { profile });
  } catch (error) {
    console.error(error);
    return res.render('formula-chemistry', {
      message: 'An error occurred.',
    });
  }
};

exports.formula_math = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('formula-math', { profile });
  } catch (error) {
    console.error(error);
    return res.render('formula-math', {
      message: 'An error occurred.',
    });
  }
};

exports.formula_physics = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('formula-physics', { profile });
  } catch (error) {
    console.error(error);
    return res.render('formula-physics', {
      message: 'An error occurred.',
    });
  }
};

exports.measurement_units = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('measurement_units', { profile });
  } catch (error) {
    console.error(error);
    return res.render('measurement_units', {
      message: 'An error occurred.',
    });
  }
};

exports.periodic_table = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('periodic_table', { profile });
  } catch (error) {
    console.error(error);
    return res.render('periodic_table', {
      message: 'An error occurred.',
    });
  }
};

exports.unit_conversion = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('unit_conversion', { profile });
  } catch (error) {
    console.error(error);
    return res.render('unit_conversion', {
      message: 'An error occurred.',
    });
  }
};

exports.universal_constants = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('universal_constants', { profile });
  } catch (error) {
    console.error(error);
    return res.render('universal_constants', {
      message: 'An error occurred.',
    });
  }
};

exports.universal_prefixes = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('universal_prefixes', { profile });
  } catch (error) {
    console.error(error);
    return res.render('universal_prefixes', {
      message: 'An error occurred.',
    });
  }
};

exports.view_course = async (req, res, next) => {
  try {
    const email = req.email;
    const profile = await getUserByEmail(email);
    return res.render('viewCourses', { profile });
  } catch (error) {
    console.error(error);
    return res.render('viewCourses', {
      message: 'An error occurred.',
    });
  }
};

// Edit profile endpoint
exports.editProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const userEmail = req.user.email;

    // Update the user's profile information in the database
    await updateUserProfile(name, userEmail);

    // Redirect back to the dashboard
    return res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    return res.render('dashboard', {
      message: 'An error occurred.',
    });
  }
};

// Helper function to get user by email from the database
function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM user WHERE email = ?',
      [email],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      },
    );
  });
}

// Helper function to get user by ID from the database
function getUserById(email) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM user WHERE email = ?',
      [email],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      },
    );
  });
}

// Helper function to insert a new user into the database
function insertUser(user) {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO user SET ?', user, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Helper function to update the user's profile information in the database
function updateUserProfile(name, email) {
  return new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE user SET name = ?, email = ? WHERE email = ?';
    db.query(updateQuery, [name, email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
