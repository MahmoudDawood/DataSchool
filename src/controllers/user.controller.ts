import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

export namespace UserController {
	export const create = async (req: Request, res: Response, next: NextFunction) => {
		// TODO: Check express validators errors to return them
		try {
			const { firstName, lastName, gender, phone, email, password } = req.body;
			if (!firstName || !lastName || !gender || !phone || !email || !password) {
				return next(
					new Error("Please provide first, last name, gender, phone, email, password")
				);
			}
			const result = await UserService.create({
				firstName,
				lastName,
				gender,
				phone,
				email,
				password,
			});
			if (result) {
				res.cookie("jwt", result.token, {
					httpOnly: true,
					maxAge: COOKIE_MAX_AGE as number,
				});
				return res.status(201).json({
					message: "User created successfully",
					data: result,
				});
			}
		} catch (error) {
			next(error);
		}
	};

	export const login = async (req: Request, res: Response, next: NextFunction) => {
		// TODO: Check -Split- if user is an instructor
		try {
			const data = req.body;
			const result = await UserService.login(data);

			res.cookie("jwt", result.token, {
				httpOnly: true,
				maxAge: COOKIE_MAX_AGE as number,
			});
			return res.status(201).json({
				message: "User Logged In successfully",
				data: result,
			});
		} catch (error) {
			next(error);
		}
	};

	export const logout = async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.clearCookie("jwt");
			return res
				.status(200)
				.json({ message: "Logged out successfully" })
				.redirect("/login");
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const findAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const users = await UserService.findAll();
			return res.status(200).json({ data: users });
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const findById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide User id"));
			}
			const user = await UserService.findById(id);
			return res.status(200).json({ data: user });
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const updateById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide User id"));
			}
			const data = req.body;
			const user = await UserService.updateById(id, data);
			return res.status(201).json({
				message: "User updated successfully",
				data: user,
			});
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const updatePassword = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			// TODO: Make it only available through email link
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide User id"));
			}
			const newPassword = req.body.password;
			const user = await UserService.updatePassword(id, newPassword);
			return res.status(201).json({
				message: "User password updated successfully",
				data: user,
			});
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide User id"));
			}
			await UserService.deleteById(id);
			return res.status(204).json({ message: "User deleted successfully" });
		} catch (error: any) {
			next(new Error(error));
		}
	};
}
