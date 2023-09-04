import { Router } from "express";
import { EnrollmentController } from "../controllers/enrollment.controller";
import authenticate from "../middlewares/authenticate";
import { authorize, isAdmin } from "../middlewares/authorize";
const enrollmentRouter = Router();

enrollmentRouter.use(authenticate);
enrollmentRouter.post("/", EnrollmentController.create); // Create an enrollment
enrollmentRouter.get("/user/:id", authorize, EnrollmentController.findByUserId); // Find all user's enrollment
enrollmentRouter.get("/course/:id", isAdmin, EnrollmentController.findByCourseId); // Find enrollments in a course
enrollmentRouter.delete("/:userId/:courseId", isAdmin, EnrollmentController.deleteById); // Delete an enrollment

export { enrollmentRouter };
