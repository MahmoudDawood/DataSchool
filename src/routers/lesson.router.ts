import { Router } from "express";
import { LessonController } from "../controllers/lesson.controller";
import authenticate from "../middlewares/authenticate";
const lessonRouter = Router();

// TODO: Handle viewing first 3 lessons for unauthenticated users
lessonRouter.post("/", authenticate, LessonController.create); // Create a lesson
lessonRouter.get("/", authenticate, LessonController.findAll); // Get all lessons
lessonRouter.get("/:id", authenticate, LessonController.findById); // Get a lesson
lessonRouter.put("/:id", authenticate, LessonController.updateById); // Update a lesson
lessonRouter.delete("/:id", authenticate, LessonController.deleteById); // Delete a lesson

export { lessonRouter };
