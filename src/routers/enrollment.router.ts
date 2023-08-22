import { Router } from "express";
import { EnrollmentController } from "../controllers/enrollment.controller";
const enrollmentRouter = Router();

enrollmentRouter.post("/", EnrollmentController.create); // Create an enrollment
enrollmentRouter.get("/user/:id", EnrollmentController.findByUserId); // Find all user's enrollment
enrollmentRouter.get("/course/:id"); // Find enrollments in a course
enrollmentRouter.delete("/:userId/:courseId"); // Delete an enrollment

export { enrollmentRouter };
