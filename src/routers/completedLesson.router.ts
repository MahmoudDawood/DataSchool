import { Router } from "express";
import { CompletedLessonController } from "../controllers/completedLesson.controller";

const completedLessonRouter = Router();

// TODO: Handle mark as viewed for the first 3 lessons from unauthenticated users
completedLessonRouter.post("/", CompletedLessonController.saveLesson); // Create lesson completion entry
completedLessonRouter.get(
	"/:userId/:courseId",
	CompletedLessonController.findCompletedLessons
); // Find finished lessons in enrollment

export { completedLessonRouter };
