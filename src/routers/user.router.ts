import { Router } from "express";
import { InstructorController } from "../controllers/instructor.controller";
import { UserController } from "../controllers/user.controller";
import authenticate from "../middlewares/authenticate";
const userRouter = Router();

// TODO: Add express validators middleware
userRouter.post("/signup", UserController.create); // Create new user
userRouter.post("/instructors/signup", InstructorController.create); // Create new Instructor
userRouter.post("/login", UserController.login); // Login
userRouter.post("/logout/:id", authenticate, UserController.logout); // Logout
userRouter.get("/", authenticate, UserController.findAll); // Get all users (Private)
userRouter.get("/instructors", InstructorController.findAll); // Get all instructors
userRouter.get("/:id", authenticate, UserController.findById); // Get user by Id
userRouter.get("/instructors/:id", InstructorController.findById); // Get Instructor by Id
userRouter.put("/:id", authenticate, UserController.updateById); // Update user profile
userRouter.put("/instructors/:id", authenticate, InstructorController.updatedById); // Update Instructor profile
userRouter.put("/password/:id", authenticate, UserController.updatePassword); // Reset Password
userRouter.delete("/:id", authenticate, UserController.deleteById); // Delete User (Private)

export { userRouter };
