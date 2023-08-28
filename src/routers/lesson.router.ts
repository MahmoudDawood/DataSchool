import { Router } from "express";
import { LessonController } from "../controllers/lesson.controller";
const lessonRouter = Router();

lessonRouter.post("/", LessonController.create); // Create a lesson
lessonRouter.get("/", LessonController.findAll); // Get a lesson
lessonRouter.get("/:id", LessonController.findById); // Get a lesson
lessonRouter.put("/:id", LessonController.updateById); // Update a lesson
lessonRouter.delete("/:id", LessonController.deleteById); // Delete a lesson

export { lessonRouter };
