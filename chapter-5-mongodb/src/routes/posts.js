const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// READ (index): list all posts (you can keep this in pages.js if you prefer)
router.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  res.render("posts/index", { title: "All Posts", posts });
});

// CREATE (form)
router.get("/posts/new", (req, res) => {
  res.render("posts/new", { title: "New Post", error: null, form: { title: "", content: "" } });
});

// CREATE (action)
router.post("/posts", async (req, res) => {
  const title = (req.body.title || "").trim();
  const content = (req.body.content || "").trim();

  if (!title || !content) {
    return res.status(400).render("posts/new", {
      title: "New Post",
      error: "Title and content are required.",
      form: { title, content },
    });
  }

  const post = await Post.create({ title, content });
  res.redirect(`/posts/${post._id}`);
});

// READ (show): view one post
router.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).lean();
  if (!post) return res.status(404).render("404", { title: "Not Found" });

  res.render("posts/show", { title: post.title, post });
});

// UPDATE (edit form)
router.get("/posts/:id/edit", async (req, res) => {
  const post = await Post.findById(req.params.id).lean();
  if (!post) return res.status(404).render("404", { title: "Not Found" });

  res.render("posts/edit", { title: `Edit: ${post.title}`, post, error: null });
});

// UPDATE (action) — using POST to avoid method-override complexity
router.post("/posts/:id/edit", async (req, res) => {
  const title = (req.body.title || "").trim();
  const content = (req.body.content || "").trim();

  if (!title || !content) {
    const post = await Post.findById(req.params.id).lean();
    return res.status(400).render("posts/edit", {
      title: `Edit: ${post?.title || "Post"}`,
      post: { ...(post || {}), title, content },
      error: "Title and content are required.",
    });
  }

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true, runValidators: true }
  ).lean();

  if (!post) return res.status(404).render("404", { title: "Not Found" });

  res.redirect(`/posts/${post._id}`);
});

// DELETE (action)
router.post("/posts/:id/delete", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/posts");
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Post = require("../models/Post");

// router.get("/posts/new", (req, res) => {
//   res.render("posts/new", { title: "New Post" });
// });

// router.post("/posts", async (req, res) => {
//   const title = (req.body.title || "").trim();
//   const content = (req.body.content || "").trim();

//   if (!title || !content) {
//     return res.status(400).send("Title and content are required.");
//   }

//   await Post.create({ title, content });
//   res.redirect("/");
// });

// module.exports = router;

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