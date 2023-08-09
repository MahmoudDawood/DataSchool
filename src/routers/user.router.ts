import crypto from "crypto";
import { Router } from "express";
import {
	createUserRequest,
	createUserResponse,
	listUsersRequest,
	listUsersResponse,
} from "../apiTypes";
import { db } from "../datastore";
import { ExpressHandler, User } from "../types";

const userRouter = Router();

const getUsers: ExpressHandler<listUsersRequest, listUsersResponse> = (req, res) => {
	res.send({ users: db.getUsers() });
};

const createUser: ExpressHandler<createUserRequest, createUserResponse> = (req, res) => {
	const user = req.body;
	if (!user || !user.firstName || !user.lastName || !user.email || !user.password) {
		return res.sendStatus(400);
	}

	const newUser: User = {
		id: crypto.randomUUID(),
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		password: user.password,
		createdAt: Date.now(),
		updatedAt: Date.now(),
	};
	db.signup(newUser);
	res.sendStatus(200);
};

userRouter.get("/", getUsers);
userRouter.post("/register", createUser);
userRouter.post("/login", (req, res) => {});
userRouter.get("/logout", (req, res) => {});
userRouter.get("/me", (req, res) => {});
userRouter.put("/me", (req, res) => {});
userRouter.put("/me/password", (req, res) => {});

export default userRouter;
