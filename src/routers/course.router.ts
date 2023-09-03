import { Router } from "express";
import { CourseController } from "../controllers/course.controller";
import authenticate from "../middlewares/authenticate";
const courseRouter = Router();

courseRouter.post("/", authenticate, CourseController.create); // Create a course
courseRouter.post("/topics/:id", authenticate, CourseController.attachTopics); // Attach topics
courseRouter.get("/", CourseController.findAllCardInfo); // Get all courses card info
courseRouter.get("/search", CourseController.searchByNameTopic); // Search for course by name
courseRouter.get("/:id", CourseController.findById); // Get course by id
courseRouter.put("/:id", authenticate, CourseController.updateById); // Update a course
courseRouter.delete("/topics/:id", authenticate, CourseController.detachTopics); // De attach topics
courseRouter.delete("/:id", authenticate, CourseController.deleteById); // Delete a course

export { courseRouter };
