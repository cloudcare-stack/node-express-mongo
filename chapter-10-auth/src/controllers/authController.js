const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.registerForm = (req, res) => {
  res.render("auth/register", { title: "Register", error: null, form: {} });
};

exports.register = async (req, res) => {
  try {
    const username = (req.body.username || "").trim();
    const email = (req.body.email || "").trim().toLowerCase();
    const password = req.body.password || "";

    if (!username || !email || !password) {
      return res.status(400).render("auth/register", {
        title: "Register",
        error: "All fields are required.",
        form: { username, email },
      });
    }

    if (password.length < 6) {
      return res.status(400).render("auth/register", {
        title: "Register",
        error: "Password must be at least 6 characters.",
        form: { username, email },
      });
    }

    const existing = await User.findOne({
      $or: [{ username }, { email }],
    }).lean();

    if (existing) {
      return res.status(400).render("auth/register", {
        title: "Register",
        error: "Username or email already exists.",
        form: { username, email },
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email, passwordHash });

    // log them in right away
    req.session.user = { id: user._id, username: user.username, email: user.email };
    res.redirect("/posts");
  } catch (err) {
    return res.status(500).render("auth/register", {
      title: "Register",
      error: "Something went wrong.",
      form: { username: req.body.username, email: req.body.email },
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