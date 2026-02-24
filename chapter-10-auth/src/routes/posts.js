const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const postController = require("../controllers/postController");

// Routes
router.get("/posts", postController.index);
router.get("/posts/new", postController.newForm);
router.post("/posts", upload.single("image"), postController.create);
router.get("/posts/:id", postController.show);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Post = require("../models/Post");
// const upload = require("../middleware/upload");

// // READ (index): list all posts
// router.get("/posts", async (req, res) => {
//   const posts = await Post.find().sort({ createdAt: -1 }).lean();
//   res.render("posts/index", { title: "All Posts", posts });
// });

// // CREATE (form)
// router.get("/posts/new", (req, res) => {
//   res.render("posts/new", {
//     title: "New Post",
//     error: null,
//     form: { title: "", content: "" },
//   });
// });

// // CREATE (action) + image upload
// router.post("/posts", upload.single("image"), async (req, res) => {
//   try {
//     const title = (req.body.title || "").trim();
//     const content = (req.body.content || "").trim();

//     if (!title || !content) {
//       return res.status(400).render("posts/new", {
//         title: "New Post",
//         error: "Title and content are required.",
//         form: { title, content },
//       });
//     }

//     const imageFilename = req.file ? req.file.filename : null;

//     const post = await Post.create({ title, content, imageFilename });
//     res.redirect(`/posts/${post._id}`);
//   } catch (err) {
//     return res.status(400).render("posts/new", {
//       title: "New Post",
//       error: err.message || "Upload error",
//       form: { title: req.body.title || "", content: req.body.content || "" },
//     });
//   }
// });

// // READ (show): view one post
// router.get("/posts/:id", async (req, res) => {
//   const post = await Post.findById(req.params.id).lean();
//   if (!post) return res.status(404).render("404", { title: "Not Found" });

//   res.render("posts/show", { title: post.title, post });
// });

// // UPDATE (edit form)
// router.get("/posts/:id/edit", async (req, res) => {
//   const post = await Post.findById(req.params.id).lean();
//   if (!post) return res.status(404).render("404", { title: "Not Found" });

//   res.render("posts/edit", { title: `Edit: ${post.title}`, post, error: null });
// });

// // UPDATE (action) — using POST to avoid method-override complexity
// router.post("/posts/:id/edit", async (req, res) => {
//   const title = (req.body.title || "").trim();
//   const content = (req.body.content || "").trim();

//   if (!title || !content) {
//     const post = await Post.findById(req.params.id).lean();
//     return res.status(400).render("posts/edit", {
//       title: `Edit: ${post?.title || "Post"}`,
//       post: { ...(post || {}), title, content },
//       error: "Title and content are required.",
//     });
//   }

//   const post = await Post.findByIdAndUpdate(
//     req.params.id,
//     { title, content },
//     { new: true, runValidators: true }
//   ).lean();

//   if (!post) return res.status(404).render("404", { title: "Not Found" });

//   res.redirect(`/posts/${post._id}`);
// });

// // DELETE (action)
// router.post("/posts/:id/delete", async (req, res) => {
//   await Post.findByIdAndDelete(req.params.id);
//   res.redirect("/posts");
// });

// module.exports = router;