const express = require("express");
const jwt = require("jsonwebtoken");
const { dashboard, user_common_page, formulae_home, admin_home, course_upload, courseDetails, facts_animal, facts_earth, facts_math, facts_planet, facts_nature, facts_science, facts_scientist, formula_chemistry, formula_math, formula_physics, measurement_units, periodic_table, unit_conversion, universal_constants, universal_prefixes, view_course, admin_view, facts_tech} = require("../controller/auth");
const router = express.Router();


router.get('/pre_loader', (req, res) => {
    res.render("pre_loader");
});

router.get('/', (req, res) => {
    res.render("index");
});

router.get('/logout', (req, res) => {
    // Clear the token cookie and redirect to the login page
    res.clearCookie('token');
    res.redirect('/');
});

router.get('/h_stem', (req, res) => {
    res.render("h_stem");
});

router.get('/h_programming', (req, res) => {
    res.render("h_programming");
});

router.get('/h_career_exploration', (req, res) => {
    res.render("h_career_exploration");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get('/aboutus', (req, res) => {
    res.render("aboutus");
})

router.get("/register", (req, res) => {
    res.render("register");
});

// router.get("/user_common_page", (req, res) => {
//     res.render("user_common_page");
// });

// router.get("/formulae-home", (req, res) => {
//     res.render("formulae-home");
// });

// router.get("/formula-chemistry", (req, res) => {
//     res.render("formula-chemistry");
// });

// router.get("/formula-physics", (req, res) => {
//     res.render("formula-physics");
// });

// router.get("/formula-math", (req, res) => {
//     res.render("formula-math");
// });

// router.get("/prefix", (req, res) => {
//     res.render("universal_prefixes");
// });

// router.get("/constant", (req, res) => {
//     res.render("universal_constants");
// });

// router.get("/periodicTable", (req, res) => {
//     res.render("periodic_table");
// });

// router.get("/unit", (req, res) => {
//     res.render("measurement_units");
// });

// router.get("/unit-c", (req, res) => {
//     res.render("unit_conversion");
// });

// router.get("/animal", (req, res) => {
//     res.render("facts_animal");
// });

// router.get("/scientist", (req, res) => {
//     res.render("facts_scientist");
// });

// router.get("/earth", (req, res) => {
//     res.render("facts_earth");
// });

// router.get("/nature", (req, res) => {
//     res.render("facts_nature");
// });

// router.get("/planet", (req, res) => {
//     res.render("facts_planet");
// });

// router.get("/math", (req, res) => {
//     res.render("facts_math");
// });

// router.get("/science", (req, res) => {
//     res.render("facts_science");
// });

// router.get("/edit-profile", (req, res) => {
//     res.render("facts_science");
// });

// router.get("/tech", (req, res) => {
//     res.render("facts_tech");
// });

// router.get("/upload", (req, res) => {
//     res.render("course_upload");
// });

// router.get("/admin_view", (req, res) => {
//     res.render("admin_view");
// });

// router.get("/admin_home", (req, res) => {
//     res.render("admin_home");
// });

router.get("/animal", (req, res) => {
    res.render("facts_animal");
});

router.get("/admin_home", verifyJWT, admin_home);
router.get("/admin_view", verifyJWT, admin_view);
router.get("/course_upload", verifyJWT, course_upload);
router.get("/courseDetails", verifyJWT, courseDetails);
router.get("/scientist", (req, res) => {
    res.render("facts_scientist");
});

router.get("/earth", (req, res) => {
    res.render("facts_earth");
});

router.get("/nature", (req, res) => {
    res.render("facts_nature");
});

router.get("/planet", (req, res) => {
    res.render("facts_planet");
});

router.get("/math", (req, res) => {
    res.render("facts_math");
});

router.get("/science", (req, res) => {
    res.render("facts_science");
});

router.get("/tech", (req, res) => {
    res.render("facts_tech");
});


router.get("/quiz_page", (req, res) => {
    res.render("quiz_page");
});


router.get("/calculator", (req, res) =>{
    res.render("calculator");
});

router.get("/dashboard", verifyJWT, dashboard);

router.get("/facts_animal", verifyJWT, facts_animal);
router.get("/facts_earth", verifyJWT, facts_earth);
router.get("/facts_math", verifyJWT, facts_math);
router.get("/facts_nature", verifyJWT, facts_nature);
router.get("/facts_planet", verifyJWT, facts_planet);
router.get("/facts_science", verifyJWT, facts_science);
router.get("/facts_scientist", verifyJWT, facts_scientist);
router.get("/facts_tech", verifyJWT, facts_tech);

router.get("/user_common_page", verifyJWT, user_common_page);
router.get("/upload", verifyJWT, course_upload);

router.get("/formulae-home", verifyJWT, formulae_home);
router.get("/formula-chemistry", verifyJWT, formula_chemistry);
router.get("/formula-math", verifyJWT, formula_math);
router.get("/formula-physics", verifyJWT, formula_physics);

router.get("/measurement_units", verifyJWT, measurement_units);
router.get("/periodic_table", verifyJWT, periodic_table);
router.get("/unit_conversion", verifyJWT, unit_conversion);
router.get("/universal_constants", verifyJWT, universal_constants);
router.get("/universal-prefixes", verifyJWT, universal_prefixes);
router.get("/viewCourses", verifyJWT, view_course);

function verifyJWT(req, res, next) {
    try {
        const token = req.cookies.token;
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.email = payload.email;
        next();
    } catch(err) {
        console.error(err);
        next(err)
    }
}


module.exports = router;
