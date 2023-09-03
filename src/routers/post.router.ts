import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import authenticate from "../middlewares/authenticate";
const postRouter = Router();

postRouter.post("/", authenticate, PostController.create); // Create a blog post
postRouter.post("/topics/:id", authenticate, PostController.attachTopics); // Attach topic to post
postRouter.get("/", PostController.findAllCardInfo); // Get all posts
postRouter.get("/search", PostController.searchByName); // Search for post by name
postRouter.get("/:id", PostController.findById); // Get post by id
postRouter.put("/:id", authenticate, PostController.updateById); // Update blog post by id
postRouter.delete("/topics/:id", authenticate, PostController.detachTopics); // Detach topic from post
postRouter.delete("/:id", authenticate, PostController.deleteById); // Delete blog post by id

export { postRouter };
