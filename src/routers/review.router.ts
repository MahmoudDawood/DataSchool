import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import authenticate from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
const reviewRouter = Router();

reviewRouter.post("/", authenticate, ReviewController.create); // Create a review
reviewRouter.get("/user/:id", authenticate, authorize, ReviewController.getUserReviews); // Get user reviews
reviewRouter.get("/:id", ReviewController.getCourseReviews); // Get course reviews
reviewRouter.put(
	"/:userId/:courseId",
	authenticate,
	authorize,
	ReviewController.updatedReview
); // Update review
reviewRouter.delete(
	"/:userId/:courseId",
	authenticate,
	authorize,
	ReviewController.deleteReview
); // Delete review

export { reviewRouter };
