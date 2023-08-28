import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
const commentRouter = Router();

commentRouter.post("/", CommentController.create); // Create a comment
commentRouter.get("/user/:id", CommentController.findUserComments); // Get user's comments
commentRouter.get("/post/:id", CommentController.findPostComments); // Get comments on a post
commentRouter.put("/:id", CommentController.updateById); // Update a comment
commentRouter.delete("/:id", CommentController.deleteById); // Delete a comment

export { commentRouter };
