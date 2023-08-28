import { Router } from "express";
import { LikeController } from "../controllers/like.controller";
const likeRouter = Router();

likeRouter.post("/", LikeController.create); // Create a like
likeRouter.get("/user/:userId/:postId", LikeController.getLikeState); // Get like status for this user on this post
likeRouter.get("/user/:id", LikeController.findUserLikes); // Get likes of a user
likeRouter.get("/post/:id", LikeController.findPostLikes); // Get likes count on a post
likeRouter.delete("/:userId/:postId", LikeController.deleteLike); // Delete a like

export { likeRouter };
