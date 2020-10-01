const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.get("/", (req, res) => {
    res.render("home");
});

// Show sign up form
router.get("/register", (req, res) => {
    res.render("register");
});

// Handle sign up logic

// Show login form - would like to make this into a modal
router.get("/register", (req, res) => {
    res.render("login");
});

// Handle login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/shops",
    faiulureRedirect: "/login"
}), (req, res) => {
        res.send("Logic")
})

// Logout route


module.exports = router;