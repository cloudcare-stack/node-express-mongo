const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// View all posts by a user
router.get("/users/:id/posts", userController.postsByUser);

module.exports = router;