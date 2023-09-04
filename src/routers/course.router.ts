import { Router } from "express";
import { CourseController } from "../controllers/course.controller";
import authenticate from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorize";
const courseRouter = Router();

courseRouter.post("/", authenticate, isAdmin, CourseController.create); // Create a course
courseRouter.post("/topics/:id", authenticate, isAdmin, CourseController.attachTopics); // Attach topics
courseRouter.get("/", CourseController.findAllCardInfo); // Get all courses card info
courseRouter.get("/search", CourseController.searchByNameTopic); // Search for course by name
courseRouter.get("/:id", CourseController.findById); // Get course by id
courseRouter.put("/:id", authenticate, isAdmin, CourseController.updateById); // Update a course
courseRouter.delete("/topics/:id", authenticate, isAdmin, CourseController.detachTopics); // De attach topics
courseRouter.delete("/:id", authenticate, isAdmin, CourseController.deleteById); // Delete a course

export { courseRouter };
