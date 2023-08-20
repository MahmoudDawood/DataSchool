import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = Router();

// TODO: Add express validators middleware
// userRouter.get("/", );
userRouter.post("/signup", UserController.signup);
userRouter.post("/login");
userRouter.get("/logout");
userRouter.get("/me");
userRouter.put("/me");
userRouter.put("/me/password");

export default userRouter;
