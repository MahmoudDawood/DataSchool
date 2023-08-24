import { NextFunction, Request, Response } from "express";
import { LikeService } from "../services/like.service";

export namespace LikeController {
	export const create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId, postId } = req.body;
			if (!userId || !postId) {
				throw new Error("Please provide both userId and postId in req body");
			}
			const like = await LikeService.create({ userId, postId });
			return res.status(201).json({
				message: "Like created successfully",
				data: like,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findLikesCount = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const postId = req.params.id;
			if (!postId) {
				throw new Error("Please provide postId in req parameters");
			}
			const count = await LikeService.findLikesCount(postId);
			return res.status(200).json({ data: count });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findUserLikes = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const userId = req.params.id;
			if (!userId) {
				throw new Error("Please provide userId in req parameters");
			}
			const likes = await LikeService.findUserLikes(userId);
			return res.status(200).json({ data: likes });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const getLikeState = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId, postId } = req.params;
			if (!userId || !postId) {
				throw new Error("Please provide userId and postId in req parameters");
			}
			const state = await LikeService.getLikeState({ userId, postId });
			return res.status(200).json({ data: state });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteLike = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId, postId } = req.params;
			if (!userId || !postId) {
				throw new Error("Please provide userId and postId in req body");
			}
			const deletedLike = await LikeService.deleteLike({ userId, postId });
			return res.status(204).json({ message: "Like deleted successfully" });
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
