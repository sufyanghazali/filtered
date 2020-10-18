const mongoose = require("mongoose");
const Shop = require("./models/shop");
const Comment = require("./models/comment");

const data = [
    {
        name: "Hemingway",
        image: "https://cdn.broadsheet.com.au/cache/17/b8/17b83ec09c22076be5fb6b0d86bc1611.jpg",
        address: "2/152-158 St Georges Terrace, Perth",
    },
    {
        name: "Artem Coffee",
        image: "https://cdn.broadsheet.com.au/cache/9d/e4/9de48bfa31d09ff3fa7945df847d066b.jpg",
        address: "Unit 2/39 Reynolds Rd, Mount Pleasant WA 6153",
    },
    {
        name: "Modus",
        image: "https://cdn.broadsheet.com.au/cache/9d/e4/9de48bfa31d09ff3fa7945df847d066b.jpg",
        address: "660 Albany Highway, Victoria Park",
    }
];

function seedDB() {
    Shop.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed shops.");

            data.forEach(seed => {
                Shop.create(seed, (err, shop) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added a shop");

                        // Comment.create({
                        //     text: "Coffee here's good", author: {
                        //         id: {},
                        //         username: "sufyan"
                        //     }
                        // }, (err, comment) => {
                        //     if (err) {
                        //         console.log(err);
                        //     } else {
                        //         console.log(comment);
                        //         shop.comments.push(comment);
                        //         shop.save();
                        //         console.log("Created new comment.");
                        //     }
                        // });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;