import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
const commentRouter = Router();

commentRouter.post("/", CommentController.create); // Create a comment
commentRouter.get("/:id", CommentController.getPostComments); // Get comments on a post
commentRouter.get("/user/:id", CommentController.getUserComments); // Get user's comments
commentRouter.put("/", CommentController.updateById); // Update a comment
commentRouter.delete("/", CommentController.deleteById); // Delete a comment

export { commentRouter };
