import { NextFunction, Request, Response } from "express";
import { InstructorService } from "../services/instructor.service";
import { UserService } from "../services/user.service";

export namespace InstructorController {
	export const create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = req.body;
			const instructor = await InstructorService.create(data);
			return res.status(201).json({
				message: "Instructor created successfully",
				data: instructor,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findAll = async (req: Request, res: Response, next: NextFunction) => {
		// TODO: Include a find all cards info only
		try {
			const instructors = await InstructorService.findAll();
			return res.status(200).json({ data: instructors });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide Instructor id"));
			}
			const instructor = await InstructorService.findById(id);
			return res.status(200).json({ data: instructor });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updatedById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide Instructor id"));
			}
			const data = req.body;
			const instructor = await InstructorService.updatedById(id, data);
			return res.status(201).json({
				message: "Instructor updated successfully",
				data: instructor,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
