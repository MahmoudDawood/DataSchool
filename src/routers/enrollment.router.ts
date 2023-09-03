import { Router } from "express";
import { EnrollmentController } from "../controllers/enrollment.controller";
import authenticate from "../middlewares/authenticate";
const enrollmentRouter = Router();

enrollmentRouter.use(authenticate);
enrollmentRouter.post("/", EnrollmentController.create); // Create an enrollment
enrollmentRouter.get("/user/:id", EnrollmentController.findByUserId); // Find all user's enrollment
enrollmentRouter.get("/course/:id", EnrollmentController.findByCourseId); // Find enrollments in a course
enrollmentRouter.delete("/:userId/:courseId", EnrollmentController.deleteById); // Delete an enrollment

export { enrollmentRouter };
