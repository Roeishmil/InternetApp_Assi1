import express from "express";
const router = express.Router();
import postsController from"../controllers/posts_controller";

router.get("/", postsController.getAllPosts);

router.get("/:id", postsController.getPostById);

router.post("/", postsController.createAPost);

router.put("/:id", postsController.updatePostByID);

export default router;