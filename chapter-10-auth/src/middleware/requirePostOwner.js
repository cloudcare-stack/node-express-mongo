const Post = require("../models/Post");

module.exports = async function requirePostOwner(req, res, next) {
  try {
    if (!req.session?.user) return res.redirect("/login");

    const post = await Post.findById(req.params.id).lean();
    if (!post) return res.status(404).render("404", { title: "Not Found" });

    const userId = req.session.user.id;
    const ownerId = post.author;

    if (String(ownerId) !== String(userId)) {
      return res.status(403).render("403", { title: "Forbidden" });
    }

    // Optional: attach post so controller can reuse it
    req.post = post;

    next();
  } catch (err) {
    next(err);
  }
};