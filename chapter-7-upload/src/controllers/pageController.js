// src/controllers/pageController.js

exports.home = (req, res) => {
  // Either render a home page OR redirect to posts
  // Pick one. Redirect is simplest for a blog app:
  res.redirect("/posts");
};

exports.about = (req, res) => {
  res.render("about", { title: "About" });
};

exports.contact = (req, res) => {
  res.render("contact", { title: "Contact" });
};