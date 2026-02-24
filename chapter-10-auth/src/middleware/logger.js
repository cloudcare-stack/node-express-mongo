// src/middleware/logger.js
function logger(req, res, next) {
  const start = Date.now();

  // Runs when the response finishes
  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`);
  });

  next();
}

module.exports = logger;