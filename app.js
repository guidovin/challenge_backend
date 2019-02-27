const express = require("express"),
        app = express(),
        routes = require("./routes/todoRoutes");

//app config
app.use(express.json());
app.use(express.urlencoded({
   extended: true
 }));

//RESTFULL routes

app.get("/", (req, res) => {
    res.redirect("/todos");
});
app.get("/todos", routes.getTodos);
app.get("/todos/:id", routes.getTodo);
app.get("/todos/:id/edit", routes.getTodo);
app.post("/todos", routes.createTodo);
app.put("/todos/:id", routes.updateTodo);
app.delete("/todos/:id",   routes.deleteTodo);

app.listen(process.env.PORT||4000, process.env.IP);

module.exports = app;
