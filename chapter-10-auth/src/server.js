// src/server.js
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env");
    }
    if (!process.env.SESSION_SECRET) {
      console.warn("⚠️  SESSION_SECRET is missing; using fallback dev secret.");
    }

    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();