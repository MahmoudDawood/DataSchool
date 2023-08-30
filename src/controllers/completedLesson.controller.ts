import { NextFunction, Request, Response } from "express";
import { CompletedLessonService } from "../services/completedLesson.service";

export namespace CompletedLessonController {
	export const saveLesson = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const lessonData = req.body;
			const lesson = await CompletedLessonService.saveLesson(lessonData);
			return res.status(201).json({
				message: "Lesson completed successfully",
				data: lesson,
			});
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const findCompletedLessons = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { userId, courseId } = req.params;
			if (!userId || !courseId) {
				next(new Error("Please provide user and course id"));
			}
			const completedLessons = await CompletedLessonService.findCompletedLessons({
				userId,
				courseId,
			});
			return res.status(200).json({ data: completedLessons });
		} catch (error: any) {
			next(new Error(error));
		}
	};
}
