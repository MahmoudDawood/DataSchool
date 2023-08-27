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
				data: newPost,
			});
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const findAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const posts = await PostService.findAll();
			return res.status(200).json({ data: posts });
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const findById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide Post id"));
			}
			const post = await PostService.findById(id);
			return res.status(200).json({ data: post });
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const searchByName = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const name = String(req.query.name) || "";
			const posts = await PostService.searchByName(name);
			return res.status(200).json({ data: posts });
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const updateById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			// TODO: Convert content markdown to HTML using marked
			// TODO: Sanitize the HTML content before storing it using DOMPurify
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide Post id"));
			}
			const updatedData = req.body;
			if (!id) {
				throw new Error("Provide post id");
			}
			const updatedPost = await PostService.updateById(id, updatedData);
			return res.status(201).json({
				message: "Post updated successfully",
				data: updatedPost,
			});
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide Post id"));
			}
			if (!id) {
				throw new Error("Provide post id");
			}
			await PostService.deleteById(id);
			return res.status(204).json({ message: "Post deleted successfully" });
		} catch (error: any) {
			next(new Error(error));
		}
	};
}
