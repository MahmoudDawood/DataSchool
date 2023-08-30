import { Router } from "express";
import { CompletedLessonController } from "../controllers/completedLesson.controller";

const completedLessonRouter = Router();

completedLessonRouter.post("/", CompletedLessonController.saveLesson); // Create lesson completion entry
completedLessonRouter.get(
	"/:userId/:courseId",
	CompletedLessonController.findCompletedLessons
); // Find finished lessons in enrollment

export { completedLessonRouter };
