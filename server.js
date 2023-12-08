// Load the express module
const express = require('express');

// Create an instance of the express app
const app = express();

// Define a route handler for the root path
app.get('/', (req, res) => {
  // Send back a simple text response
  res.send('Hello, world!');
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

