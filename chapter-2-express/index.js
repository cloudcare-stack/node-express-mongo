// Serve static files from the "public" directory
const path = require("path");
// const publicPath = path.join(__dirname, "public");
// app.use(express.static(publicPath));
const express = require("express");

// Create an Express application
const app = express();
const PORT = 3000;


// Middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});