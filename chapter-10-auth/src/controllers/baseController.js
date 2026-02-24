// src/controllers/baseController.js

exports.notFound = (res) => res.status(404).render("404", { title: "Not Found" });

exports.forbidden = (res) => res.status(403).render("403", { title: "Forbidden" });

// Optional: consistent success redirect helper
exports.redirect = (res, path) => res.redirect(path);