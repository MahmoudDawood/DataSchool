import { NextFunction, Request, Response } from "express";
import { CommentService } from "../services/comment.service";

export namespace CommentController {
	export const create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId, postId, comment } = req.body;
			if (!userId || !postId) {
				throw new Error("Please provide both userId and postId in req body");
			} else if (!comment) {
				throw new Error("Please provide a comment in the request body");
			}
			const createdComment = await CommentService.create({ userId, postId, comment });
			return res.status(201).json({
				message: "Comment created successfully",
				comment: createdComment,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const getPostComments = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const postId = req.params.id;
			if (!postId) {
				throw new Error("Please provide postId in req parameters");
			}
			const comments = await CommentService.getPostComments(postId);
			return res.status(200).json({ comments });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const getUserComments = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.params.id;
			if (!userId) {
				throw new Error("Please provide userId in req parameters");
			}
			const comments = await CommentService.getPostComments(userId);
			return res.status(200).json({ comments });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updateById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id, comment } = req.body;
			if (!id) {
				throw new Error("Please provide comment id in req body");
			} else if (!comment) {
				throw new Error("Please provide a comment id in req body");
			}
			const newComment = await CommentService.updateById({ id, comment });
			return res.status(202).json({
				message: "Comment updated successfully",
				comment: newComment,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.body.id;
			if (!id) {
				throw new Error("Please provide comment id in req body");
			}
			const deletedComment = await CommentService.deleteById(id);
			return res.status(202).json({
				message: "Comment deleted successfully",
				comment: deletedComment,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
