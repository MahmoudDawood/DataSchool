import { Router } from "express";
import { CompletedLessonController } from "../controllers/completedLesson.controller";
import authenticate from "../middlewares/authenticate";
const completedLessonRouter = Router();

// TODO: Handle mark as viewed for the first 3 lessons from unauthenticated users
// TODO: Authorize user by Id which is in req.tokenId
completedLessonRouter.post("/", authenticate, CompletedLessonController.saveLesson); // Create lesson completion entry
completedLessonRouter.get(
	"/:userId/:courseId",
	authenticate,
	CompletedLessonController.findCompletedLessons
); // Find finished lessons in enrollment

export { completedLessonRouter };
