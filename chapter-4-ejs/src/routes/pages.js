const path = require('path');
const express = require('express');
const router = express.Router();

// Route for the home page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'views', 'index.html'));
});

// Route for the about page
router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'views', 'about.html'));
});

// Route for the contact page
router.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'views', 'contact.html'));
});

module.exports = router;