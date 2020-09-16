const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("home");
});

// Show sign up form

// Handle sign up logic

// Show login form - would like to make this into a modal

// Handle login logic

// Lougout route


module.exports = router;