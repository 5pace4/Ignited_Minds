const express = require("express");
const authController = require("../controller/auth");

const router = express.Router();

// See the post method used in here from register.hbs file
router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router;