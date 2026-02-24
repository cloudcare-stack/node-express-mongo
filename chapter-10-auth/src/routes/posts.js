const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const postController = require("../controllers/postController");
const requireAuth = require("../middleware/requireAuth");

// Routes
router.get("/posts", postController.index);
router.get("/posts/new", postController.newForm);
router.post("/posts", upload.single("image"), postController.create);
router.get("/posts/:id", postController.show);
router.get("/posts/new", requireAuth, postController.newForm);
router.post("/posts", requireAuth, upload.single("image"), postController.create);

router.get("/posts/:id/edit", requireAuth, postController.editForm);
router.post("/posts/:id/edit", requireAuth, postController.update);
router.post("/posts/:id/delete", requireAuth, postController.remove);

module.exports = router;

