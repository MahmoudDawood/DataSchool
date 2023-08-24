import { NextFunction, Request, Response } from "express";
import { EnrollmentService } from "../services/enrollment.service";

export namespace EnrollmentController {
	export const create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId, courseId } = req.body;
			if (!userId || !courseId) {
				throw new Error("Please provide both user and course id in req body");
			}
			const enrollment = await EnrollmentService.create({ userId, courseId });
			return res.status(201).json({
				message: "Enrollment created successfully",
				data: enrollment,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findByUserId = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.params.id;
			const enrollments = await EnrollmentService.findByUserId(userId);
			return res.status(200).json({ data: enrollments });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findByCourseId = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const courseId = req.params.id;
			const enrollments = await EnrollmentService.findByCourseId(courseId);
			return res.status(200).json({ data: enrollments });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId, courseId } = req.params;
			await EnrollmentService.deleteById(userId, courseId);
			return res.status(204).json({ message: "Enrollment cancelled successfully" });
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
