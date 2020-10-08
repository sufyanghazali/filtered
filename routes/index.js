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
router.post("/register", (req, res) => {

    // Create user
    const newUser = new User({
        username: req.body.username
    });

    // Add to database
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("register", {user: user});
        } else {
            passport.authenticate("local")(req, res, () => {
                // req.flash("success", `Welcome ${user.username}`);
                res.redirect("/shops");
            });
        }
    });
});

// Show login form - would like to make this into a modal
router.get("/login", (req, res) => {
    res.render("login");
});

// Handle login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/shops",
    faiulureRedirect: "/login"
}), (req, res) => {
});

// Logout route
router.get("/logout", (req, res) => {
    req.logout();
    // req.flash
    res.redirect("/shops");
})


module.exports = router;