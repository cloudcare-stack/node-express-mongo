const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  res.render("index", { title: "Home", posts });
});

router.get("/about", (req, res) => res.render("about", { title: "About" }));
router.get("/contact", (req, res) => res.render("contact", { title: "Contact" }));

module.exports = router;

// const express = require("express");
// const router = express.Router();

// const postsRouter = require("./posts");

// router.get("/", (req, res) => {
//   // postsRouter.posts is our temporary store
//   res.render("index", { title: "Home", posts: postsRouter.posts || [] });
// });

// router.get("/about", (req, res) => {
//   res.render("about", { title: "About" });
// });

// router.get("/contact", (req, res) => {
//   res.render("contact", { title: "Contact" });
// });

// module.exports = router;