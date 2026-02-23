// Build the Express application
const path = require('path');
const express = require('express');

// Import the routes for the pages
const pagesRouter = require('./routes/pages');

// Create an instance of the Express application
const app = express();

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the pages router for all routes starting with '/'
app.use('/', pagesRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));
});

// Export the app for use in the server.js file
module.exports = app;