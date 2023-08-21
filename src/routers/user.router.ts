import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = Router();

// TODO: Add express validators middleware
userRouter.post("/signup", UserController.signup);
userRouter.post("/login");
userRouter.get("/", UserController.findAll);
userRouter.get("/users");
userRouter.get("/instructors");
userRouter.get("/logout");
userRouter.get("/profile/:id"); // Get profile info
userRouter.put("/profile/:id"); // Update profile
userRouter.put("/me/password"); // Reset Password
userRouter.delete("/:id");

export default userRouter;
