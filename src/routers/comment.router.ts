import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import authenticate from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
const commentRouter = Router();

commentRouter.post("/", authenticate, CommentController.create); // Create a comment
commentRouter.get(
	"/user/:id",
	authenticate,
	authorize,
	CommentController.findUserComments
); // Get user's comments
commentRouter.get("/post/:id", authenticate, CommentController.findPostComments); // Get comments on a post
// TODO: Authorize deleting and updating comments for user by id from req.tokenId
commentRouter.put("/:id", authenticate, CommentController.updateById); // Update a comment
commentRouter.delete("/:id", authenticate, CommentController.deleteById); // Delete a comment

export { commentRouter };
