import { NextFunction, Request, Response } from "express";
import { TopicService } from "../services/topic.service";

export namespace TopicController {
	export const create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = req.body;
			const topic = await TopicService.create(data);
			return res.status(201).json({
				message: "Topic created successfully",
				topic,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const topics = await TopicService.findAll();
			return res.status(200).json({ topics });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			await TopicService.deleteById(id);
			return res.status(204).json({ message: "Topic deleted successfully" });
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
