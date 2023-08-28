import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";

const reviewRouter = Router();

reviewRouter.post("/", ReviewController.create); // Create a review
reviewRouter.get("/user/:id", ReviewController.getUserReviews); // Get user reviews
reviewRouter.get("/:id", ReviewController.getCourseReviews); // Get course reviews
reviewRouter.put("/:userId/:courseId", ReviewController.updatedReview); // Update review
reviewRouter.delete("/:userId/:courseId", ReviewController.deleteReview); // Delete review

export { reviewRouter };
