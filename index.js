// Import Necessary Libraries
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const multer = require('multer');

// Select the path for the .env file
dotenv.config({
  path: './.env',
});

const app = express();

// Creating DB Connection for db
let db;

try {
  db = mysql.createConnection(process.env.DATABASE_URL);
  console.log('Connected to PlanetScale!');
} catch (error) {
  console.error(error);
}

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination folder where files will be stored
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define the filename for the uploaded file
    cb(null, file.originalname);
  },
});

// Create Multer upload instance
const upload = multer({ storage: storage });

// For accessing the CSS and JS and All other Assets
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parsing URL-Encoded Bodies as Sent by HTML Forms
app.use(express.urlencoded({ extended: false }));
// Parse JSON Bodies as Sent by HTML Forms
app.use(express.json());

app.use(cookieParser());

// Setup the engine to load the front-end
app.set('view engine', 'hbs');

// Defining Routes for Organizing The Pages
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/authentication'));
// Ends

// Course Upload Section
app.post(
  '/upload',
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'notes', maxCount: 1 },
  ]),
  (req, res) => {
    // Access uploaded files using req.files
    const { image1, image2, image3, image4, notes } = req.files;

    // Extract other form data
    const {
      heading,
      semiHeading,
      content1,
      content2,
      content3,
      content4,
      category,
      subcategory,
    } = req.body;

    // Save course details and file paths in the database
    const courseData = {
      heading,
      image1_path: image1 ? image1[0].path : '',
      image2_path: image2 ? image2[0].path : '',
      image3_path: image3 ? image3[0].path : '',
      image4_path: image4 ? image4[0].path : '',
      semi_heading: semiHeading,
      content1,
      content2,
      content3,
      content4,
      notes_path: notes ? notes[0].path : '',
      category,
      subcategory,
    };

    db.query('INSERT INTO courses SET ?', courseData, (err, results) => {
      if (err) {
        console.error('Error inserting course details: ' + err.stack);
        return res.status(500).send('Error inserting course details.');
      }
      return res.render('course_upload', {
        successMessage: 'Course Uploaded Successfully!!!',
      });
    });
  },
);

app.get('/courses/:category/:subcategory?', (req, res) => {
  const { category, subcategory } = req.params;

  let query = 'SELECT id, heading, image1_path, semi_heading FROM courses';
  let values = [];
  if (category) {
    query += ' WHERE category = ?';
    values.push(category);
  }

  if (subcategory) {
    query += ' AND subcategory = ?';
    values.push(subcategory);
  }

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error retrieving course details: ' + err.stack);
      return res.status(500).send('Error retrieving course details.');
    }

    res.render('viewCourses', { courses: results, category, subcategory });
  });
});

app.get('/courses/:category/:subcategory/:id', (req, res) => {
  let { category, subcategory, id } = req.params;

  // Check if category or subcategory is empty
  if (!category || !subcategory) {
    return res.status(400).send('Invalid category or subcategory.');
  }

  let query =
    'SELECT * FROM courses WHERE category = ? AND subcategory = ? AND id = ?';
  let values = [category, subcategory, id];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error retrieving course details: ' + err.stack);
      return res.status(500).send('Error retrieving course details.');
    }

    if (results.length === 0) {
      return res.status(404).send('Course not found.');
    }

    res.render('courseDetails', { course: results[0] });
  });
});

app.get('/adminCourses', (req, res) => {
  const { id } = req.params;

  let query = 'SELECT id, heading, image1_path, semi_heading FROM courses';

  db.query(query, id, (err, results) => {
    if (err) {
      console.error('Error retrieving course details: ' + err.stack);
      return res.status(500).send('Error retrieving course details.');
    }

    res.render('admin_view', { courses: results });
  });
});

app.get('/userCourses', (req, res) => {
  const { id } = req.params;

  let query = 'SELECT id, heading, image1_path, semi_heading FROM courses';

  db.query(query, id, (err, results) => {
    if (err) {
      console.error('Error retrieving course details: ' + err.stack);
      return res.status(500).send('Error retrieving course details.');
    }

    res.render('dashboard', { courses: results });
  });
});

// Delete Course
app.get('/adminCourses/delete/:heading', (req, res) => {
  const { heading } = req.params;

  // Perform the deletion logic based on the heading
  const deleteQuery = 'DELETE FROM courses WHERE heading = ?';
  const value = [heading];
  db.query(deleteQuery, value, (err, result) => {
    if (err) {
      console.error('Error deleting course: ' + err.stack);
      return res.status(500).send('Error deleting course.');
    }

    res.send(`Course with heading "${heading}" has been deleted.`);
  });
});

// app.get('/dashboard', (req, res) => {
//   db.query('SELECT * FROM notes', (err, result) => {
//     if (err) throw err;
//     res.render('dashboard', { notes: result });
//   });
// });

// app.post('/add', (req, res) => {
//   const { title, content } = req.body;
//   const note = { title, content };
//   db.query('INSERT INTO notes SET ?', note, (err, result) => {
//     if (err) throw err;
//     res.render('dashboard');
//   });
// });

// app.get('/edit/:id', (req, res) => {
//   const noteId = req.params.id;
//   db.query('SELECT * FROM notes WHERE id = ?', noteId, (err, result) => {
//     if (err) throw err;
//     res.render('edit_note', { note: result[0] });
//   });
// });

// app.post('/update/:id', (req, res) => {
//   const noteId = req.params.id;
//   const { title, content } = req.body;
//   db.query(
//     'UPDATE notes SET title = ?, content = ? WHERE id = ?',
//     [title, content, noteId],
//     (err, result) => {
//       if (err) throw err;
//       res.redirect('/dashboard');
//     }
//   );
// });

// app.get('/delete/:id', (req, res) => {
//   const noteId = req.params.id;
//   db.query('DELETE FROM notes WHERE id = ?', noteId, (err, result) => {
//     if (err) throw err;
//     res.redirect('/');
//   });
// });

// app.post('/upload', upload.fields([
//     { name: 'image1', maxCount: 1 },
//     { name: 'image2', maxCount: 1 },
//     { name: 'image3', maxCount: 1 },
//     { name: 'image4', maxCount: 1 },
//     { name: 'notes', maxCount: 1 }
//   ]), (req, res) => {
//     // Access uploaded files using req.files
//     const { image1, image2, image3, image4, notes } = req.files;

//     // Extract other form data
//     const { heading, semiHeading, content1, content2, content3, content4 } = req.body;

//     // Save course details and file paths in the database
//     const courseData = {
//       heading,
//       image1_path: image1 ? image1[0].path : '',
//       image2_path: image2 ? image2[0].path : '',
//       image3_path: image3 ? image3[0].path : '',
//       image4_path: image4 ? image4[0].path : '',
//       semi_heading: semiHeading,
//       content1,
//       content2,
//       content3,
//       content4,
//       notes_path: notes ? notes[0].path : '',
//     };

//     db.query('INSERT INTO courses SET ?', courseData, (err, results) => {
//       if (err) {
//         console.error('Error inserting course details: ' + err.stack);
//         return res.status(500).send('Error inserting course details.');
//       }
//       res.send("Send Succesful");
//     });
//   });

// Define a new route for displaying uploaded courses
//   app.get('/admin_courses', (req, res) => {
//     db.query('SELECT id, heading, image1_path, semi_heading FROM courses', (err, results) => {
//       if (err) {
//         console.error('Error retrieving course details: ' + err.stack);
//         return res.status(500).send('Error retrieving course details.');
//       }

//       res.render('admin_View', { courses: results });
//     });
//   });

//   app.get('/courses/:id', (req, res) => {
//     const courseId = req.params.id;

//     db.query('SELECT * FROM courses WHERE id = ?', courseId, (err, results) => {
//       if (err) {
//         console.error('Error retrieving course details: ' + err.stack);
//         return res.status(500).send('Error retrieving course details.');
//       }

//       if (results.length === 0) {
//         return res.status(404).send('Course not found.');
//       }

//       res.render('courseDetails', { course: results[0] });
//     });
//   });

// // Delete tuples based on specific criteria
// app.post('/delete', (req, res) => {
//     const { heading } = req.body;

//     db.query('DELETE FROM courses WHERE heading = ?', heading, (err, results) => {
//       if (err) {
//         console.error('Error deleting tuples: ' + err.stack);
//         return res.status(500).send('Error deleting tuples.');
//       }

//       res.send('Tuples deleted successfully.');
//     });
//   });

PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
