
const express = require('express');
const app = express();

const todosRouter = require('./routes/todos');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// app.use(middleware) => add built-in express middleware
app.use(express.json()); // express.json() is a middleware function that parses incoming requests with json payloads
app.use(logger);

app.use('/todos', todosRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
