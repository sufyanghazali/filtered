const mongoose = require("mongoose");

const shop = new mongoose.Schema({
    name: String,
    image: String,
    address: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId, // Id of the comment
        ref: "User" // ref of Model
    }],
});

module.exports = mongoose.model("Shop", shop);