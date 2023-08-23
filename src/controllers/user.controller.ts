import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";

export namespace UserController {
	export const create = async (req: Request, res: Response, next: NextFunction) => {
		// TODO: Check express validators errors to return them
		try {
			let { firstName, lastName, gender, phone, email, password } = req.body;
			gender = gender.toUpperCase();

			const user = await UserService.create({
				firstName,
				lastName,
				gender,
				phone,
				email,
				password,
			});

			res.status(201).json({
				message: "User created successfully",
				user,
			});
			next(user.user.id);
		} catch (error) {
			next(error);
		}
	};

	export const login = async (req: Request, res: Response, next: NextFunction) => {
		// TODO: Check if user is an instructor
		try {
		} catch (error) {
			next(error);
		}
	};

	export const findAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const users = await UserService.findAll();
			return res.status(200).json({ users });
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const findById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			const user = await UserService.findById(id);
			return res.status(200).json({ user });
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const updateById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			const data = req.body;
			const user = await UserService.updateById(id, data);
			return res.status(201).json({
				message: "User updated successfully",
				user,
			});
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
		try {
			// TODO: Make it only available through email link
			const id = req.params.id;
			const newPassword = req.body.password;
			const user = await UserService.updatePassword(id, newPassword);
			return res.status(201).json({
				message: "User password updated successfully",
				user,
			});
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			await UserService.deleteById(id);
			return res.status(204).json({ message: "User deleted successfully" });
		} catch (error: any) {
			next(new Error(error));
		}
	};
}
