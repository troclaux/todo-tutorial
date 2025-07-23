// these routes do not up a database, they only update an in-memory array

const express = require('express');

const { v4: uuidv4 } = require('uuid'); // generates unique id for each todo
const router = express.Router();

let todos = []; // in-memory database

// GET /todos
router.get('/', (req, res) => {
  res.json(todos);
});

// POST /todos
router.post('/', (req, res, next) => {
  const { title } = req.body; // get the body of the request
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title is required and must be a string' });
  }
  const newTodo = {
    id: uuidv4(),
    title,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// GET /todos/:id
router.get('/:id', (req, res) => { // the : is a special syntax in express that indicates id as an url parameter
  const todo = todos.find(t => t.id === req.params.id); // use req.params. to get the parameters from the request
  // todos.find(): Returns the value of the first element in the array where predicate is true and undefined otherwise
  // (t => t.id === req.params.id): arrow function that iterates through the todos array, and returns the first matching id
  // (input => return statement): input is t, return statement is t.id === res.params.id
  // t.id: access the id property of the current todo project
  // req.params.id: uses res.params to extract the id field from the request
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo); // use res.json to send the response as a json
});

// PUT /todos/:id
router.put('/:id', (req, res) => {
  const { title, completed } = req.body; // get the values of title and completed in the request's body
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });

  if (typeof title !== 'string' || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  todo.title = title;
  todo.completed = completed;

  res.json(todo);
});

// DELETE /todos/:id
router.delete('/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });

  todos.splice(index, 1);
  res.status(204).send();
});

module.exports = router;

