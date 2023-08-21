import { Router } from "express";
import { PostController } from "../controllers/post.controller";
const postRouter = Router();

postRouter.get("/", PostController.findAll); // Get all posts
postRouter.get("/id", PostController.findById); // Get post by id
postRouter.get("/:name", PostController.searchByName); // Search for post by name
postRouter.post("/", PostController.create); // Create a blog post
postRouter.put("/:id", PostController.updateById); // Update blog post by id
postRouter.delete("/:id", PostController.deleteById); // Delete blog post by id
