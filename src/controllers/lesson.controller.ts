import { NextFunction, Request, Response } from "express";
import { LessonService } from "../services/lesson.service";

export namespace LessonController {
	export const create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const lessonData = req.body;
			const lesson = await LessonService.create(lessonData);
			return res.status(201).json({
				message: "Lesson created successfully",
				data: lesson,
			});
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const findAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const lessons = await LessonService.findAll();
			return res.status(200).json({ data: lessons });
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const findById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide Lesson id"));
			}
			const lesson = await LessonService.findById(id);
			return res.status(200).json({ data: lesson });
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const updateById = async (req: Request, res: Response, next: NextFunction) => {
		console.log("Hi");
		try {
			console.log(req.body);
			const id = req.params.id;
			const updatedData = req.body;
			if (!id) {
				return next(new Error("Please provide Lesson id"));
			}
			const lesson = await LessonService.updateById(id, updatedData);
			return res.status(201).json({
				message: "Lesson updated successfully",
				data: lesson,
			});
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide Lesson id"));
			}
			await LessonService.deleteById(id);
			return res.status(204).json({ message: "Lesson deleted successfully" });
		} catch (error: any) {
			next(new Error(error));
		}
	};
}
