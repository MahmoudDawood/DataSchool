import { Router } from "express";
import { CourseController } from "../controllers/course.controller";

const courseRouter = Router();

courseRouter.post("/", CourseController.create); // Create a course
courseRouter.get("/", CourseController.findAll); // Get all courses
courseRouter.get("/name", CourseController.findByName); // Get course info by name // Decide priority by id or name
courseRouter.get("/:id", CourseController.findById); // Get course info by id
courseRouter.put("/id"); // Update a course
courseRouter.delete("/:id", CourseController.deleteById); // Delete a post

export default courseRouter;
