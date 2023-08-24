import { Router } from "express";
import { LessonController } from "../controllers/lesson.controller";
const lessonRouter = Router();

lessonRouter.post("/", LessonController.create); // Create a lesson
lessonRouter.post("/:id", LessonController.findById); // Get a lesson
lessonRouter.post("/:id", LessonController.updateById); // Update a lesson
lessonRouter.post("/:id"); // Delete a lesson

export { lessonRouter };
