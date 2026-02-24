const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const requireAuth = require("../middleware/requireAuth");
const requirePostOwner = require("../middleware/requirePostOwner");
const postController = require("../controllers/postController");

// Public
router.get("/posts", postController.index);
router.get("/posts/:id", postController.show);

// Logged in (create)
router.get("/posts/new", requireAuth, postController.newForm);
router.post("/posts", requireAuth, upload.single("image"), postController.create);

// Owner-only (edit/delete)
router.get("/posts/:id/edit", requirePostOwner, postController.editForm);
router.post("/posts/:id/edit", requirePostOwner, postController.update);
router.post("/posts/:id/delete", requirePostOwner, postController.remove);

module.exports = router;

// const express = require("express");
// const router = express.Router();

// const upload = require("../middleware/upload");
// const requireAuth = require("../middleware/requireAuth");
// const postController = require("../controllers/postController");

// // Public (anyone can view)
// router.get("/posts", postController.index);
// router.get("/posts/:id", postController.show);

// // Protected (must be logged in)
// router.get("/posts/new", requireAuth, postController.newForm);
// router.post("/posts", requireAuth, upload.single("image"), postController.create);

// router.get("/posts/:id/edit", requireAuth, postController.editForm);
// router.post("/posts/:id/edit", requireAuth, postController.update);
// router.post("/posts/:id/delete", requireAuth, postController.remove);

// module.exports = router;

