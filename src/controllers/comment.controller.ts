import { NextFunction, Request, Response } from "express";
import { CommentService } from "../services/comment.service";

export namespace CommentController {
	export const create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId, postId, comment } = req.body;
			if (!userId || !postId) {
				return next(new Error("Please provide both userId and postId"));
			} else if (!comment) {
				return next(new Error("Please provide a comment"));
			}
			const createdComment = await CommentService.create({ userId, postId, comment });
			return res.status(201).json({
				message: "Comment created successfully",
				data: createdComment,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const getPostComments = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const postId = req.params.id;
			if (!postId) {
				return next(new Error("Please provide postId"));
			}
			const comments = await CommentService.getPostComments(postId);
			return res.status(200).json({ data: comments });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const getUserComments = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const userId = req.params.id;
			if (!userId) {
				return next(new Error("Please provide userId"));
			}
			const comments = await CommentService.getPostComments(userId);
			return res.status(200).json({ data: comments });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updateById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			const data = req.body;
			if (!id) {
				return next(new Error("Please provide comment id"));
			} else if (!data.comment) {
				return next(new Error("Please provide a comment"));
			}
			const comment = await CommentService.updateById(id, data);
			return res.status(201).json({
				message: "Comment updated successfully",
				data: comment,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide comment id"));
			}
			await CommentService.deleteById(id);
			return res.status(204).json({ message: "Comment deleted successfully" });
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
