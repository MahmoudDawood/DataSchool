import { NextFunction, Request, Response } from "express";
import { PostService } from "../services/post.service";

export namespace PostController {
	export const create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			// TODO: Convert content markdown to HTML using marked
			// TODO: Sanitize the HTML content before storing it using DOMPurify
			const { authorId, title, image, content } = req.body;
			const newPost = await PostService.create({
				authorId,
				title,
				image,
				content,
			});
			return res.status(201).json({
				message: "Post created successfully",
				post: newPost,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const posts = await PostService.findAll();
			return res.status(200).json({ posts });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			const post = await PostService.findById(id);
			return res.status(200).json({ post });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const searchByName = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const name = String(req.query.name) || "";
			const posts = await PostService.searchByName(name);
			return res.status(200).json({ posts });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updateById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			// TODO: Convert content markdown to HTML using marked
			// TODO: Sanitize the HTML content before storing it using DOMPurify
			const id = req.params.id;
			const updatedData = req.body;
			if (!id) {
				throw new Error("Provide post id in the request body");
			}
			const updatedPost = await PostService.updateById(id, updatedData);
			return res.status(201).json({
				message: "Post updated successfully",
				post: updatedPost,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const postId = req.params.id;
			if (!postId) {
				throw new Error("Provide post id in the request body");
			}
			await PostService.deleteById(postId);
			return res.status(204).json({ message: "Post deleted successfully" });
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
