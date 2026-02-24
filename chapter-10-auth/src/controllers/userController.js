const User = require("../models/User");
const Post = require("../models/Post");
const { notFound } = require("./baseController");

// GET /users/:id/posts
exports.postsByUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("username").lean();
    if (!user) return notFound(res);

    const posts = await Post.find({ author: user._id })
      .select("title content createdAt author imageFilename")
      .sort({ createdAt: -1 })
      .lean(); // no populate needed here

    res.render("users/posts", {
      title: `Posts by ${user.username}`,
      user,
      posts,
    });
  } catch (err) {
    next(err);
  }
};