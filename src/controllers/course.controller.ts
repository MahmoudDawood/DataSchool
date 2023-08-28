import { NextFunction, Request, Response } from "express";
import { CourseService } from "../services/course.service";

export namespace CourseController {
	// TODO:
	export const create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				title,
				instructorId,
				description,
				duration,
				preview,
				price,
				outcomes,
				photo,
			} = req.body;
			const course = await CourseService.create({
				title,
				instructorId,
				description,
				duration,
				preview,
				price,
				outcomes,
				photo,
			});

			return res.status(201).json({
				message: "Course created successfully",
				data: course,
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
			const courses = await CourseService.findAllCardInfo();
			return res.status(200).json({ data: courses });
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const findById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide Course id"));
			}
			const course = await CourseService.findById(id);
			return res.status(200).json({ data: course });
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

			const courses = await CourseService.searchByNameTopic(name, topicsArr);
			return res.status(200).json({ data: courses });
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const updateById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide Course id"));
			}
			const data = req.body;
			const course = await CourseService.updateById(id, data);
			res.status(201).json({
				message: "Course is updated successfully",
				data: course,
			});
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const attachTopics = async (req: Request, res: Response, next: NextFunction) => {
		try {
			console.log("Attaching");
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide Course id"));
			}
			const topics = req.body.topics;
			const course = await CourseService.attachTopics(id, topics);
			res.status(201).json({
				message: "Topics attached to course successfully",
				data: course,
			});
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const detachTopics = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide Course id"));
			}
			const topics = req.body.topics;
			const course = await CourseService.detachTopics(id, topics);
			res.status(204).json({
				message: "Topic detached to course successfully",
				data: course,
			});
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = String(req.params.id);
			if (!id) {
				return next(new Error("Please provide Course id"));
			}
			await CourseService.deleteById(id);
			res.status(204).json({ message: "Course is deleted successfully" });
		} catch (error: any) {
			next(new Error(error));
		}
	};
}
