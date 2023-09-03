import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import authenticate from "../middlewares/authenticate";

const reviewRouter = Router();

reviewRouter.post("/", authenticate, ReviewController.create); // Create a review
reviewRouter.get("/user/:id", authenticate, ReviewController.getUserReviews); // Get user reviews
reviewRouter.get("/:id", ReviewController.getCourseReviews); // Get course reviews
reviewRouter.put("/:userId/:courseId", authenticate, ReviewController.updatedReview); // Update review
reviewRouter.delete("/:userId/:courseId", authenticate, ReviewController.deleteReview); // Delete review

export { reviewRouter };
