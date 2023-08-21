import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";

const reviewRouter = Router();

reviewRouter.post("/", ReviewController.create); // Create a review
reviewRouter.get("/:id", ReviewController.getCourseReviews); // Get course reviews
reviewRouter.get("/user/:id", ReviewController.getUserReviews); // Get user reviews
reviewRouter.put("/", ReviewController.updatedReview); // Update review
reviewRouter.delete("/", ReviewController.deleteReview); // Delete review
