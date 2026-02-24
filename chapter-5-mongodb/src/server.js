// src/server.js
// Load environment variables from .env file
require("dotenv").config();

// Import the Express app and the database connection function
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start the server
(async () => {
  await connectDB(process.env.MONGO_URI);

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})();