const Todo = require('../models/todo.js');
const  validateTodo = require('../util/validateTodo.js');

//RESTFULL ROUTES
function getTodos(req,res){
  Todo.find({userID:req.params.userID}, (err, todos) =>{
    if(err) res.send("Failed to retrieve to-do's");
    else res.send(todos);
  })
}

function deleteTodo(req,res){
    Todo.findOneAndDelete({ _id: req.params.id }, (err, removedTodo) => {
      if(err) res.send('Failed to remove todo with selected ID');
      else Todo.find({userID:req.params.userID} , (err, todos) => {

        if(err) res.send("Failed to retrieve to-do's");
        else res.send(todos);
      })

    });
}
//todos/guido todos/:userID
function createTodo(req,res){
    let validated = validateTodo(req.body);

    if(validated.error) {
      res.status(333).send(validated.error.details[0].message);
      return;
    }
    let userId;
    if(req.params.userID) userId = req.params.userID;
    else userId = 'User';
    const todo = new Todo({
      text: req.body.text,
      completed: false,
      added: Date().toString(),
      userID: userId,
    });
    todo.save((saveErr, newTodo) => {
        if(saveErr){
          res.status(500).send('Error while saving new todo on the creatTodo route');
          return;
        }
        else Todo.find({userID:newTodo.userID} , (err, todos) => {

          if(err) res.send("Failed to retrieve to-do's");
          else res.status(200).send(todos);
        })
    });
}

function getTodo(req,res){
  Todo.find({_id:req.params.id, userID:req.params.userID}, (err, todo) =>{
     if(!err){
       res.json(todo);
     }
     else res.status(400).send('Could not retrieve to-do with selected ID.');
  });
}

function updateTodo(req, res){
  let validated = validateTodo(req.body);

  if(validated.error) {
    res.status(333).send(validated.error.details[0].message);
    return;
  }
  Todo.findById(req.body._id, (err, todo) => {
    todo.completed = req.body.completed;
    todo.text = req.body.text;
    todo.save((saveErr, updatedTodo) => {
        if(saveErr){
          res.status(500).send('Failed to save updated to-do on update route');
          return;
        }
        else Todo.find({userID:updatedTodo.userID} , (err, todos) => {
          if(err) res.send("Failed to retrieve to-do's");
          else res.status(200).send(todos);
        })
    });
  });
}

module.exports = { deleteTodo, getTodos, createTodo, getTodo, updateTodo };
