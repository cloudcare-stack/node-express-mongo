// Build the Express application
const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

// Import the routes for the pages
const pagesRouter = require('./routes/pages');
const postsRouter = require('./routes/posts');

// Create an instance of the Express application
const app = express();
// Set EJS as the view engine and configure express-ejs-layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Middleware: parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));
// Middleware: parse JSON bodies (for API requests)
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the pages router for all routes starting with '/'
app.use('/', pagesRouter);
// Use the posts router for all routes starting with '/posts'
app.use('/', postsRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));
});

// Export the app for use in the server.js file
module.exports = app;