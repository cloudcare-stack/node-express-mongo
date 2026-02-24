const Post = require("../../models/Post");

// GET /api/posts
exports.index = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    res.json({ data: posts });
  } catch (err) {
    next(err);
  }
};

// GET /api/posts/:id
exports.show = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    if (!post) return res.status(404).json({ error: "Not Found" });
    res.json({ data: post });
  } catch (err) {
    next(err);
  }
};

// POST /api/posts
exports.create = async (req, res, next) => {
  try {
    const title = (req.body.title || "").trim();
    const content = (req.body.content || "").trim();

    if (!title || !content) {
      return res.status(400).json({ error: "title and content are required" });
    }

    const post = await Post.create({ title, content });
    res.status(201).json({ data: post });
  } catch (err) {
    next(err);
  }
};

// PUT /api/posts/:id
exports.update = async (req, res, next) => {
  try {
    const title = (req.body.title || "").trim();
    const content = (req.body.content || "").trim();

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    ).lean();

    if (!post) return res.status(404).json({ error: "Not Found" });
    res.json({ data: post });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/posts/:id
exports.remove = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id).lean();
    if (!post) return res.status(404).json({ error: "Not Found" });
    res.json({ data: post });
  } catch (err) {
    next(err);
  }
};