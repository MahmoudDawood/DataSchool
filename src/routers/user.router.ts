import { Router } from "express";
import { InstructorController } from "../controllers/instructor.controller";
import { UserController } from "../controllers/user.controller";

const userRouter = Router();

// TODO: Add express validators middleware
userRouter.post("/signup", UserController.create); // Create new user
userRouter.post("/instructor/signup", InstructorController.create); // Create new Instructor
userRouter.post("/login", UserController.login); // Login
userRouter.get("/", UserController.findAll); // Get all users (Private)
userRouter.get("/instructor", InstructorController.findAll); // Get all instructors
userRouter.get("/:id", UserController.findById); // Get user by Id
userRouter.get("/instructor/:id", InstructorController.findById); // Get Instructor by Id
userRouter.put("/:id", UserController.updateById); // Update user profile
userRouter.put("/instructor/:id", InstructorController.updatedById); // Update Instructor profile
userRouter.put("/password", UserController.updatePassword); // Reset Password
userRouter.delete("/logout"); // Logout
userRouter.delete("/:id", UserController.deleteById); // Delete User (Private)

export { userRouter };
