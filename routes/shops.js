const express = require("express");
const router = express.Router();
const Shop = require("../models/shop");

router.get("/", (req, res) => {

    // Get list of shops from db
    Shop.find({}, (err, shops) => {
        if (err) {
            console.log(err);
        } else {
            res.render("shop/index", {shops: shops}); // Passing shops array to template
        }
    })
});



module.exports = router;