import { Router } from "express";
import { InstructorController } from "../controllers/instructor.controller";
import { UserController } from "../controllers/user.controller";
import authenticate from "../middlewares/authenticate";
import { authorize, isAdmin } from "../middlewares/authorize";
const userRouter = Router();

// TODO: Add express validators middleware
// TODO: Separate users from instructors
userRouter.post("/signup", UserController.create); // Create new user
userRouter.post(
	"/instructors/signup",
	authenticate,
	isAdmin,
	InstructorController.create
); // Create new Instructor
userRouter.post("/login", UserController.login); // Login
userRouter.post("/logout/:id", authenticate, UserController.logout); // Logout
userRouter.get("/", authenticate, isAdmin, UserController.findAll); // Get all users (Private)
userRouter.get("/:id", authenticate, authorize, UserController.findById); // Get user by Id
userRouter.get("/instructors", InstructorController.findAll); // Get all instructors
userRouter.get("/instructors/:id", InstructorController.findById); // Get Instructor by Id
userRouter.put("/:id", authenticate, authorize, UserController.updateById); // Update user profile
userRouter.put(
	"/instructors/:id",
	authenticate,
	authorize,
	InstructorController.updatedById
); // Update Instructor profile
userRouter.put("/password/:id", authenticate, authorize, UserController.updatePassword); // Reset Password
userRouter.delete("/:id", authenticate, authorize, UserController.deleteById); // Delete User (Private)

export { userRouter };
