import { Router } from "express";
import { LikeController } from "../controllers/like.controller";
const likeRouter = Router();

likeRouter.post("/", LikeController.create); // Create a like
likeRouter.get("/:id", LikeController.findLikesCount); // Get likes count on a post
likeRouter.get("/user/:id", LikeController.findUserLikes); // Get likes of a user
likeRouter.get("/user/:userId/:postId", LikeController.getLikeState); // Get like status for this user on this post
likeRouter.delete("/", LikeController.deleteLike); // Delete a like

export { likeRouter };
