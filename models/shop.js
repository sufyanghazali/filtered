const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
    name: String,
    image: String,
    address: String
});

module.exports = mongoose.model("Shop", shopSchema);