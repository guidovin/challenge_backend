const express = require("express");
const app = express();
const routes = require("./routes/todoRoutes");
const cors = require('cors');

//app config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
   extended: true
 }));


//RESTFULL routes
app.get("/", (req, res) => {
    res.redirect("/todos/User");
});


app.get("/todos/:userID", routes.getTodos);
app.get("/todos/:userID/:id", routes.getTodo);
app.get("/todos/:userID/:id/edit", routes.getTodo);
app.post("/todos/:userID", routes.createTodo);
app.put("/todos/:userID/:id", routes.updateTodo);
app.delete("/todos/:userID/:id",   routes.deleteTodo);

app.listen(process.env.PORT||4000, process.env.IP);

module.exports = app;
