import express from "express";
const router = express.Router();
import commentsController from"../controllers/comments_controller";

router.get("/", commentsController.getAllComments);

router.get("/:id", commentsController.getCommentById);

router.post("/", commentsController.createAComment);

router.put("/:id", commentsController.updateCommentByID);

router.delete("/:id", commentsController.deleteCommentByID);

export default router;