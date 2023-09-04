import { Router } from "express";
import { LessonController } from "../controllers/lesson.controller";
import authenticate from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorize";
const lessonRouter = Router();

// TODO: Handle viewing first 3 lessons for unauthenticated users
lessonRouter.post("/", authenticate, isAdmin, LessonController.create); // Create a lesson
lessonRouter.get("/", authenticate, isAdmin, LessonController.findAll); // Get all lessons
lessonRouter.get("/:id", LessonController.findById); // Get a lesson
lessonRouter.put("/:id", authenticate, isAdmin, LessonController.updateById); // Update a lesson
lessonRouter.delete("/:id", authenticate, isAdmin, LessonController.deleteById); // Delete a lesson

export { lessonRouter };
