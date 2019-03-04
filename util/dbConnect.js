const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/todoApp', {useNewUrlParser: true});

const todoDB = mongoose.connection;

module.export = {todoDB, closeDB: () =>{todoDB.close();}};
