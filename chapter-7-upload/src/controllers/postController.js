const Post = require("../models/Post");
const { notFound } = require("./baseController");

// GET /posts
exports.index = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    res.render("posts/index", { title: "All Posts", posts });
  } catch (err) {
    next(err);
  }
};

// GET /posts/new
exports.newForm = (req, res) => {
  res.render("posts/new", {
    title: "New Post",
    error: null,
    form: { title: "", content: "" },
  });
};

// POST /posts (multer runs in route)
exports.create = async (req, res, next) => {
  try {
    const title = (req.body.title || "").trim();
    const content = (req.body.content || "").trim();

    if (!title || !content) {
      return res.status(400).render("posts/new", {
        title: "New Post",
        error: "Title and content are required.",
        form: { title, content },
      });
    }

    const imageFilename = req.file ? req.file.filename : null;
    const post = await Post.create({ title, content, imageFilename });

    res.redirect(`/posts/${post._id}`);
  } catch (err) {
    // Multer may throw; DB may throw
    res.status(400).render("posts/new", {
      title: "New Post",
      error: err.message || "Upload error",
      form: { title: req.body.title || "", content: req.body.content || "" },
    });
  }
};

// GET /posts/:id
exports.show = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    if (!post) return notFound(res);

    res.render("posts/show", { title: post.title, post });
  } catch (err) {
    next(err);
  }
};

// GET /posts/:id/edit
exports.editForm = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    if (!post) return notFound(res);

    res.render("posts/edit", { title: `Edit: ${post.title}`, post, error: null });
  } catch (err) {
    next(err);
  }
};

// POST /posts/:id/edit
exports.update = async (req, res, next) => {
  try {
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

    if (!post) return notFound(res);
    res.redirect(`/posts/${post._id}`);
  } catch (err) {
    next(err);
  }
};

// POST /posts/:id/delete
exports.remove = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/posts");
  } catch (err) {
    next(err);
  }
};