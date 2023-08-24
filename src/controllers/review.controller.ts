import { NextFunction, Request, Response } from "express";
import { ReviewService } from "../services/review.service";

export namespace ReviewController {
	export const create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId, courseId, comment, rating } = req.body;
			if (!userId || !courseId || !rating) {
				return next(new Error("Please provide userId, courseId, and rating"));
			}
			const createdReview = await ReviewService.create({
				userId,
				courseId,
				comment,
				rating,
			});
			return res.status(201).json({
				message: "Review created successfully",
				data: createdReview,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const getCourseReviews = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide Course id"));
			}
			const reviews = await ReviewService.getCourseReviews(id);
			return res.status(200).json({ data: reviews });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const getUserReviews = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide User id"));
			}
			const reviews = await ReviewService.getUserReviews(id);
			return res.status(200).json({ data: reviews });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updatedReview = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { userId, courseId } = req.params;
			if (!userId || !courseId) {
				return next(new Error("Please provide Course id, User id"));
			}
			const data = req.body;
			if (!data.rating) {
				return next(new Error("Please provide rating"));
			}
			const updatedReview = await ReviewService.updateReview(userId, courseId, data);
			return res.status(201).json({
				message: "Review updated successfully",
				data: updatedReview,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId, courseId } = req.params;
			if (!userId || !courseId) {
				return next(new Error("Please provide Course id, User id"));
			}
			await ReviewService.deleteReview(userId, courseId);
			return res.status(204).json({
				message: "Review deleted successfully",
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
