import { NextFunction, Request, Response } from "express";
import { CourseService } from "../services/course.service";

export namespace CourseController {
	export const create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { title, instructorId, description, duration, preview, price } = req.body;
			const course = await CourseService.create({
				title,
				instructorId,
				description,
				duration,
				preview,
				price,
			});

			return res.status(201).json({
				message: "Course created successfully",
				course,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			const course = await CourseService.findById(id);
			return res.status(200).json({ course });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findByName = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const nameInput = req.body.name;
			const courses = await CourseService.findByName(nameInput);
			return res.status(200).json({ courses });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const courses = await CourseService.findAll();
			return res.status(200).json({ courses });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = String(req.params.id);
			await CourseService.deleteById(id);
			res.status(204).json({ message: "Course is deleted successfully" });
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
