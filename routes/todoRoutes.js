const Todo = require('../models/todo.js'),
      validate = require('../util/validateTodo.js');

//RESTFULL ROUTES
function getTodos(req,res){
  Todo.find({}, (err, todos) =>{
    if(err) res.send("Failed to retrieve to-do's")
    else res.send(todos);
  })
}

function deleteTodo(req,res){
    Todo.findOneAndDelete({ _id: req.params.id }, (err, removedDoc) => {
      if(err) res.send('Failed to remove todo with selected ID');
      else res.send(removedDoc);
    });
}

function createTodo(req,res){
    const validated = validate(req.body);

    if(validated.error) {
      res.status(333).send(validated.error.details[0].message);
      return;
    }
    const todo = new Todo({
      text: req.body.text,
      completed: false,
      added: Date.now().toString(),
    });
    todo.save((saveErr, newTodo) => {
        if(saveErr){
          res.status(501).send('Error while saving new todo on the creatTodo route');
          return
        }
        res.status(200).send(newTodo);
    });
}

function getTodo(req,res){
  Todo.findById(req.params.id, (err, todo) =>{
     if(!err){
       res.json(todo);
     }
     else res.status(400).send('Could not retrieve to-do with selected ID.');
  });
}

function updateTodo(req, res){
  const validated = validate(req.body);

  if(validated.error) {
    res.status(333).send(validated.error.details[0].message);
    return;
  }
  Todo.findById(req.params.id, (err, todo) => {
    todo.text = req.body.text;
    todo.completed = req.body.completed;

    todo.save((saveErr, updatedTodo) => {
        if(saveErr){
          res.status(500).send('Failed to save updated to-do on update route');
          return
        }
        res.status(200).send(updatedTodo);
    });
  });
}
function getConnection(){
  return todoDB;
}
module.exports = { deleteTodo, getTodos, createTodo, getTodo, updateTodo, getConnection };
