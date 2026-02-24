const express = require("express");
const router = express.Router();
const postApiController = require("../../controllers/api/postApiController");

router.get("/posts", postApiController.index);
router.get("/posts/:id", postApiController.show);

router.post("/posts", postApiController.create);
router.put("/posts/:id", postApiController.update);
router.delete("/posts/:id", postApiController.remove);

module.exports = router;