const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/posts/new", (req, res) => {
  res.render("posts/new", { title: "New Post" });
});

router.post("/posts", async (req, res) => {
  const title = (req.body.title || "").trim();
  const content = (req.body.content || "").trim();

  if (!title || !content) {
    return res.status(400).send("Title and content are required.");
  }

  await Post.create({ title, content });
  res.redirect("/");
});

module.exports = router;

// const express = require("express");
// const router = express.Router();

// // Temporary in-memory posts store (MongoDB later)
// const posts = [
//   {
//     title: "First Post",
//     content: "This is my first post using EJS layouts + partials!",
//     createdAt: new Date().toISOString(),
//   },
// ];

// router.get("/posts/new", (req, res) => {
//   res.render("posts/new", { title: "New Post" });
// });

// router.post("/posts", (req, res) => {
//   const title = (req.body.title || "").trim();
//   const content = (req.body.content || "").trim();

//   // Basic validation (keep it simple)
//   if (!title || !content) {
//     return res.status(400).send("Title and content are required.");
//   }

//   posts.unshift({
//     title,
//     content,
//     createdAt: new Date().toISOString(),
//   });

//   res.redirect("/");
// });

// // Export BOTH router + posts so pages can render posts
// router.posts = posts;

// module.exports = router;