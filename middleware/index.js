const path = require("path");
const User = require("../models/user");
const Comment = require("../models/comment");


module.exports = {
    // checkCommentOwnership()  - to edit/delete comment

    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            //  req.flash("error", "You need to be logged in to do that");
            res.redirect("/login");
        }
    }

}