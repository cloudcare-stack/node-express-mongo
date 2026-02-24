const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const postController = require("../controllers/postController");

router.get("/", (req, res) => res.redirect("/posts"));

router.get("/posts", postController.index);

router.get("/posts/new", postController.newForm);
router.post("/posts", upload.single("image"), postController.create);

router.get("/posts/:id", postController.show);

router.get("/posts/:id/edit", postController.editForm);
router.post("/posts/:id/edit", postController.update);

router.post("/posts/:id/delete", postController.remove);

module.exports = router;