import express from "express";
const router = express.Router();
import postsController from"../controllers/posts_controller";
import { authMiddleware } from "../controllers/auth_controller";


/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - owner
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the post.
 *         title:
 *           type: string
 *           description: The title of the post.
 *         content:
 *           type: string
 *           description: The content of the post.
 *         owner:
 *           type: string
 *           description: The ID of the user who owns the post.
 *       example:
 *         _id: "63f12a3b4c7d53e1a1234567"
 *         title: "My First Post"
 *         content: "This is an example of a blog post's content."
 *         owner: "userId123"
 * 
 * /posts:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve a list of all posts in the database.
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Server error.
 */

router.get("/", postsController.getAll.bind(postsController));

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     description: Retrieve a single post by its ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: A single post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

router.get("/:id", postsController.getById.bind(postsController));

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post
 *               content:
 *                 type: string
 *                 description: The content of the post
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

router.post("/",authMiddleware, postsController.create.bind(postsController));


/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     description: Delete a single post by its ID
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", authMiddleware, postsController.deleteItem.bind(postsController));

router.put("/:id", authMiddleware, postsController.updateItem.bind(postsController));

export default router;