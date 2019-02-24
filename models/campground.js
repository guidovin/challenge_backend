const mongoose = require("mongoose"),
        Comments = require("./comment")

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String, default: "/images/gravityFalls.jpeg",
    descript: String,
    added: String, default: Date.now().toString(),
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"

    }], default: []

})

module.exports = mongoose.model("campground", campgroundSchema)
