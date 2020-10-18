const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const Shop = require("../models/shop");
const Comment = require("../models/comment");

// INDEX - show all shops. route is "/shops"
router.get("/", (req, res) => {
    // Get list of shops from db
    Shop.find({}, (err, shops) => {
        if (err) {
            console.log(err);
        } else {
            console.log(shops);
            res.render("shops/index", {shops: shops}); // Passing shops array to template
        }
    })
});

// NEW - show form to create new shop
router.get("/new", (req, res) => {
    // should check if user is logged in first
    res.render("shops/new");
})

// CREATE - add new shop
router.post("/", (req, res) => {
    // need isLoggedIn middleware
    // create new shop from request body
    const newShop = req.body.shop;

    Shop.create(newShop, (err, shop) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Created new shop");
            console.log(shop);
            res.redirect("/shops");
        }
    });
});

// SHOW - profile for a specific shop
router.get("/:id", (req, res) => {
    const id = req.params.id;

    // Get shop by id
    Shop.findById(id).populate("comments").exec((err, shop) => {
        if (err) {
            console.log(err);
        } else {
            res.render("shops/show", {shop: shop});
        }
    });
});


// EDIT - edit shop page
router.get("/:id/edit", (req, res) => {
    const id = req.params.id;

    Shop.findById(id, (err, shop) => {
        if (err) {
            console.log(err);
        } else {
            res.render("shops/edit", {shop: shop});
        }
    });
});

// UPDATE - update shop logic
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const shop = req.body.shop;

    Shop.findByIdAndUpdate(id, shop, (err, shop) => {
        if (err) {
            res.redirect("/shops");
        } else {
            res.redirect(`/shops/${id}`);
        }
    });
});

// DESTROY - yeet a shop
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let shop = await Shop.findById(id);
        await shop.remove();
        res.redirect("/shops");
    } catch (err) {
        res.redirect("/shops");
    }
});


/*******************************************************
 * 
 *  COMMENTS
 * 
 ******************************************************/

router.post("/:id/comment", middleware.isLoggedIn, (req, res) => {
    // look up shop using ID
    const id = req.params.id;

    Shop.findById(id, (err, shop) => {
        if (err) {
            req.flash("error", "Something went wrong");

            res.redirect("/shops");
        } else {
            // create new comment
            console.log(req.user);
            const comment = req.body.comment;
            console.log(comment);

            Comment.create(comment, (err, comment) => {
                if (err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    // add username and id to comment
                    // save comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    console.log(comment);
                    comment.save()
                    shop.comments.push(comment); // connect new comment to shop
                    shop.save();
                    // req.flash("success", "Successfully added comment");
                    res.redirect(`/shops/${id}`); // redirect to show page of target shop
                }
            });
        }
    })

});



module.exports = router;