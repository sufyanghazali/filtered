const mongoose = require("mongoose");
const Comment = require("./comment.js");

const Shop = new mongoose.Schema({
    name: String,
    image: String,
    address: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

Shop.pre("remove", async () => {
    await Comment.remove({
        _id: {
            $in: this.comments
        }
    });
});

module.exports = mongoose.model("Shop", Shop);