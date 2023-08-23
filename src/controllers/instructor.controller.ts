import { NextFunction, Request, Response } from "express";
import { InstructorService } from "../services/instructor.service";
import { UserService } from "../services/user.service";

export namespace InstructorController {
	export const create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { firstName, lastName, gender, phone, email, password } = req.body;
			const user = await UserService.create({
				firstName,
				lastName,
				gender,
				phone,
				email,
				password,
			});

			const { jobTitle, about, photo, socialMedia } = req.body;
			const instructor = await InstructorService.create({
				userId: user.user.id,
				jobTitle,
				about,
				photo,
				socialMedia,
			});
			return res.status(201).json({
				message: "Instructor created successfully",
				instructor,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findAll = async (req: Request, res: Response, next: NextFunction) => {
		// TODO: Include a find all cards info only
		try {
			const instructors = await InstructorService.findAll();
			return res.status(200).json({ instructors });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			const instructor = await InstructorService.findById(id);
			return res.status(200).json({ instructor });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updatedById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			const { firstName, lastName, gender, phone, email } = req.body;

			const user = await UserService.updateById(id, {
				firstName,
				lastName,
				gender,
				phone,
				email,
			});

			const userId = user.id;
			const { jobTitle, about, photo, socialMedia } = req.body;
			const instructor = await InstructorService.updatedById(userId, {
				jobTitle,
				about,
				photo,
				socialMedia,
			});
			return res.status(201).json({
				message: "Instructor updated successfully",
				instructor,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
