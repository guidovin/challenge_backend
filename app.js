const express = require("express"),
        app = express(),
        mongoose = require("mongoose"),
        Todo = require("./models/todo");

mongoose.connect("mongodb://localhost/todo");

//RESTFULL ROUTES
app.get("/", (req, res) => {
    res.redirect("/todos");
});

app.get("/todos", (req,res) => {
    Todo.find({}, (err, todosResponse) => {
      res.
    });
});

app.post("/todos", (req,res) => {
    Todo.create(req.body.todo, err => {
        if (!err) res.redirect("/todos");
    });
});

app.get("/todos/:id", (req,res) => {
    Todo.findById(req.params.id).exec((err, todo) =>{

    })
});

app.get("/todos/:id/edit", (req,res) => {
    Todo.findById(req.params.id, (error, todo) =>{
       //res.render("./todo/edit", {campground:campground})
    })
});


app.put("/todos/:id", (req,res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body.todo, (err, updatedObject) => {
        if(err){
            res.redirect("/todos")
        } else{
             todo.create({
                         text:todo_text,
                         name:todo_name,
                     }, err => {
                             if(err) {
                                 console.log(err);
                             } else {

                                 updatedObject.save((err, data) => {
                                 if(err){
                                     console.log(err);
                                 }
                               });
                             }
                     });

            res.redirect("/campgrounds/"+ req.params.id);
        }
    })
});


app.listen(process.env.PORT||4000, process.env.IP, () =>
    console.log("Server started")
);
