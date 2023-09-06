import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import authenticate from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorize";
const postRouter = Router();

postRouter.post("/topics/:id", authenticate, isAdmin, PostController.attachTopics); // Attach topic to post
postRouter.post("/", authenticate, isAdmin, PostController.create); // Create a blog post
postRouter.get("/search", PostController.searchByNameTopic); // Search for post by name
postRouter.get("/:id", PostController.findById); // Get post by id
postRouter.get("/", PostController.findAllCardInfo); // Get all posts
postRouter.put("/:id", authenticate, isAdmin, PostController.updateById); // Update blog post by id
postRouter.delete("/topics/:id", authenticate, isAdmin, PostController.detachTopics); // Detach topic from post
postRouter.delete("/:id", authenticate, isAdmin, PostController.deleteById); // Delete blog post by id

export { postRouter };
