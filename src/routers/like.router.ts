import { Router } from "express";
import { LikeController } from "../controllers/like.controller";
import authenticate from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
const likeRouter = Router();

likeRouter.post("/", authenticate, LikeController.create); // Create a like
likeRouter.get(
	"/user/:userId/:postId",
	authenticate,
	authorize,
	LikeController.getLikeState
); // Get like status for this user on this post
likeRouter.get("/user/:id", authenticate, authorize, LikeController.findUserLikes); // Get likes of a user
likeRouter.get("/post/:id", LikeController.findPostLikes); // Get likes on a post
likeRouter.delete("/:userId/:postId", authenticate, authorize, LikeController.deleteLike); // Delete a like

export { likeRouter };
