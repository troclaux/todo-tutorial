
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // err.stack = string that represents the stack trace at the point the error was created
  // stack trace: list of the active stack frames at a certain point in time in the program's execution
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
};

module.exports = errorHandler; // makes errorHandler function available for other files to import

