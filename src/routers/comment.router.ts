import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import authenticate from "../middlewares/authenticate";
const commentRouter = Router();

commentRouter.post("/", authenticate, CommentController.create); // Create a comment
commentRouter.get("/user/:id", authenticate, CommentController.findUserComments); // Get user's comments
commentRouter.get("/post/:id", CommentController.findPostComments); // Get comments on a post
commentRouter.put("/:id", authenticate, CommentController.updateById); // Update a comment
commentRouter.delete("/:id", authenticate, CommentController.deleteById); // Delete a comment

export { commentRouter };
