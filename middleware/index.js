const path = require("path");
const User = require("../models/user");
const Comment = require("../models/comment");

module.exports = {
    // checkCommentOwnership()  - to edit/delete comment
    checkCommentOwnership(req, res, next) {

        // if the user is authenticated... 
        if (req.isAuthenticated()) {
            const id = req.params.commentId;
            console.log(`ID: ${id}`);
            // get current comment object... 
            Comment.findById(id, (err, comment) => {
                if (err) {
                    // req.flash("error", "comment not found");
                    res.redirect("back");
                } else {
                    console.log(comment);
                    if (comment.author.id && comment.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        // req.flash("error", "comment not found");
                        res.redirect("back");
                    }
                }
            });
            console.log("Ownership validated.");
        } else {
            // req.flash("error", "You need to be logged in to do that");
            res.redirect("/login");
        }
    },

    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            //  req.flash("error", "You need to be logged in to do that");
            res.redirect("/login");
        }
    }
}