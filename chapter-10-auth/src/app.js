const express = require("express");
const path = require("path");

const pagesRoutes = require("./routes/pages");
const postsRoutes = require("./routes/posts");
const apiPostsRoutes = require("./routes/api/posts");
const authRoutes = require("./routes/auth");

const expressLayouts = require("express-ejs-layouts");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

// ✅ Views FIRST (so render() works everywhere)
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

// ✅ Layouts after view engine
app.use(expressLayouts);
app.set("layout", "layout");

// ✅ Body parsers before routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // for API

// ✅ Static files (CSS/JS/images) early
app.use(express.static(path.join(__dirname, "..", "public")));

// ✅ Sessions before routes (auth + protected routes need it)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      httpOnly: true,
      // secure: true, // enable in production with HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

// ✅ Make currentUser available to ALL EJS views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// routes
app.use(authRoutes);
app.use(pagesRoutes);
app.use(postsRoutes);
app.use("/api", apiPostsRoutes);

// 404 (must be last)
app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
});

module.exports = app;