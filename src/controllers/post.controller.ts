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

	export const findAllCardInfo = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const posts = await PostService.findAllCardInfo();
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

	export const searchByNameTopic = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const name = String(req.query.name);
			const topics = decodeURIComponent(req.query.topics as string);
			console.log("Name query: ", name);
			console.log("Topics query: ", topics);
			const topicsArr = topics.split(",");

			const posts = await PostService.searchByNameTopic(name, topicsArr);
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

	export const attachTopics = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				next(new Error("Please provide post id"));
			}
			const topics = req.body.topics;
			const post = await PostService.attachTopics(id, topics);
			return res.status(201).json({
				message: "Topics attached to post successfully",
				data: post,
			});
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const detachTopics = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				next(new Error("Please provide post id"));
			}
			const topics = req.body.topics;
			const post = await PostService.detachTopics(id, topics);
			return res.status(204).json({
				message: "Topics detached from post successfully",
				data: post,
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
