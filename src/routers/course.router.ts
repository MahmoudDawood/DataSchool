import { Router } from "express";
import { CourseController } from "../controllers/course.controller";

const courseRouter = Router();

courseRouter.post("/", CourseController.create); // Create a course
courseRouter.post("/topics/:id", CourseController.attachTopics); // Attach topics
courseRouter.get("/", CourseController.findAllCardInfo); // Get all courses card info
courseRouter.get("/search", CourseController.searchByNameTopic); // Search for course by name
courseRouter.get("/:id", CourseController.findById); // Get course by id
courseRouter.put("/:id", CourseController.updateById); // Update a course
courseRouter.delete("/topics/:id", CourseController.detachTopics); // De attach topics
courseRouter.delete("/:id", CourseController.deleteById); // Delete a course

export { courseRouter };
