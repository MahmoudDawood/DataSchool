import { Router } from "express";
import { LikeController } from "../controllers/like.controller";
import authenticate from "../middlewares/authenticate";
const likeRouter = Router();

likeRouter.post("/", authenticate, LikeController.create); // Create a like
likeRouter.get("/user/:userId/:postId", authenticate, LikeController.getLikeState); // Get like status for this user on this post
likeRouter.get("/user/:id", authenticate, LikeController.findUserLikes); // Get likes of a user
likeRouter.get("/post/:id", LikeController.findPostLikes); // Get likes on a post
likeRouter.delete("/:userId/:postId", authenticate, LikeController.deleteLike); // Delete a like

export { likeRouter };
