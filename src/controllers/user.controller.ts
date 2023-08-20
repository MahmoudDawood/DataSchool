import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";

export namespace UserController {
	export const signup = async (req: Request, res: Response, next: NextFunction) => {
		// TODO: Check express validators errors to return them
		let { firstName, lastName, gender, phone, email, password } = req.body;
		gender = gender.toUpperCase();

		try {
			const result = await UserService.create({
				firstName,
				lastName,
				gender,
				phone,
				email,
				password,
			});

			if (result) {
				return res.json({
					message: "User signed up successfully",
					user: { user: result.user },
				});
			}
		} catch (error) {
			next(error);
		}
	};

	export const findAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const users = await UserService.findAll();

			if (users) {
				return res.json({ users });
			}
		} catch (error: any) {
			next(new Error(error));
		}
	};
}
