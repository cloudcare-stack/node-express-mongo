const express = require("express");
const path = require("path");

const pagesRoutes = require("./routes/pages");
const postsRoutes = require("./routes/posts");
const apiPostsRoutes = require("./routes/api/posts");

const expressLayouts = require("express-ejs-layouts");

const app = express();
app.use(expressLayouts);
app.set("layout", "layout");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // <-- for API
app.use(express.static(path.join(__dirname, "..", "public")));

// routes
app.use(pagesRoutes);
app.use(postsRoutes);
app.use("/api", apiPostsRoutes);

app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

// 404
app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
});

module.exports = app;