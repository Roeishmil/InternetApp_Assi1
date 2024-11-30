const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments_controller");

router.get("/", commentsController.getAllComments);

router.get("/:id", commentsController.getCommentById);

router.post("/", commentsController.createAComment);

router.put("/:id", commentsController.updateCommentByID);

router.delete("/:id", commentsController.deleteCommentByID);

module.exports = router;