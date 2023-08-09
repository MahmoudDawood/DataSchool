import crypto from "crypto";
import { Router } from "express";
import { db } from "../datastore";
import { ExpressHandler, User } from "../types";

const userRouter = Router();

const getUsers: ExpressHandler<{}, {}> = (req, res) => {
  res.send(db.getUsers());
};

type createUserRequest = Pick<
  User,
  "firstName" | "lastName" | "email" | "password"
>;
type createUserResponse = {};
const createUser: ExpressHandler<createUserRequest, createUserResponse> = (
  req,
  res,
) => {
  if (
    !req.body ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.sendStatus(400);
  }

  const user: User = {
    id: crypto.randomUUID(),
    firstName: req.body.firstName || "",
    lastName: req.body.lastName || "",
    email: req.body.email || "",
    password: req.body.password || "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  db.signup(user);
  res.sendStatus(200);
};

userRouter.get("/", getUsers);

userRouter.post("/register", createUser);

userRouter.post("/login", (req, res) => {
  // Authenticate the login credentials
  // return a JWT
});

userRouter.get("/logout", (req, res) => {
  // Expire the token
  // Redirect to home page
});

userRouter.get("/me", (req, res) => {
  // Get profile info
});

userRouter.put("/me", (req, res) => {
  // Update profile info
});

userRouter.put("/me/password", (req, res) => {
  // (( Ask for unique code ))
  // Hash new password
  // Store new password
});

export default userRouter;
