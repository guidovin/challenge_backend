const mongoose = require("mongoose"),
      todoDB = require('../util/dbConnect.js');

let todoSchema = new mongoose.Schema({
    completed: {type:Boolean, default: false},
    text: String,
    added: {type:String, default: Date().toString()},
    userID: {type:String, default:'User'}
});

module.exports = mongoose.model('todo', todoSchema);
