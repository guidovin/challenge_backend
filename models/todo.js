const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
    name: String,
    text: String,
    added: String, default: Date.now().toString(),
});

module.exports = mongoose.model("todo", todoSchema);
