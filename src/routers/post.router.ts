import { Router } from "express";
import { PostController } from "../controllers/post.controller";
const postRouter = Router();

postRouter.post("/", PostController.create); // Create a blog post
postRouter.post("/topics/:id", PostController.attachTopics); // Create a blog post
postRouter.get("/", PostController.findAllCardInfo); // Get all posts
postRouter.get("/search", PostController.searchByName); // Search for post by name
postRouter.get("/:id", PostController.findById); // Get post by id
postRouter.put("/:id", PostController.updateById); // Update blog post by id
postRouter.delete("/topics/:id", PostController.detachTopics); // Delete blog post by id
postRouter.delete("/:id", PostController.deleteById); // Delete blog post by id

export { postRouter };
