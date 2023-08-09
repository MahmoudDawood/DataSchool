import { User } from "./types";

// Users

export type createUserRequest = Pick<User, "firstName" | "lastName" | "email" | "password">;
export type createUserResponse = {};

export type listUsersRequest = {};
export type listUsersResponse = {
	users: User[];
};

// Courses

// Lessons

// Posts

// Comments

// Likes
