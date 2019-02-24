const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    date: {type: String , default: Date.now().toString()},
    content: String,
    author: String,
    parent: {type: String, default: "page"},
})

module.exports = mongoose.model("comment", commentSchema)