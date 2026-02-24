const bcrypt = require("bcrypt");
const User = require("../models/User");
const { formatMongooseErrors } = require("../utils/formatErrors");

exports.registerForm = (req, res) => {
  res.render("auth/register", { title: "Register", error: null, errors: {}, form: {} });
};

exports.register = async (req, res) => {
  try {
    const username = (req.body.username || "").trim();
    const email = (req.body.email || "").trim().toLowerCase();
    const password = req.body.password || "";

    const form = { username, email };

    if (password.length < 6) {
      return res.status(400).render("auth/register", {
        title: "Register",
        error: "Please fix the errors below.",
        errors: { password: "Password must be at least 6 characters." },
        form,
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email, passwordHash });

    req.session.user = { id: user._id, username: user.username, email: user.email };
    res.redirect("/posts");
  } catch (err) {
    const errors = formatMongooseErrors(err);
    return res.status(400).render("auth/register", {
      title: "Register",
      error: "Please fix the errors below.",
      errors,
      form: {
        username: req.body.username || "",
        email: (req.body.email || "").toLowerCase(),
      },
    });
  }
};

exports.loginForm = (req, res) => {
  res.render("auth/login", { title: "Login", error: null, form: {} });
};

exports.login = async (req, res) => {
  const email = (req.body.email || "").trim().toLowerCase();
  const password = req.body.password || "";

  if (!email || !password) {
    return res.status(400).render("auth/login", {
      title: "Login",
      error: "Email and password are required.",
      form: { email },
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).render("auth/login", {
      title: "Login",
      error: "Invalid email or password.",
      form: { email },
    });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(400).render("auth/login", {
      title: "Login",
      error: "Invalid email or password.",
      form: { email },
    });
  }

  req.session.user = { id: user._id, username: user.username, email: user.email };
  res.redirect("/posts");
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};