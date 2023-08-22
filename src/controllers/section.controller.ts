import { NextFunction, Request, Response } from "express";
import { SectionService } from "../services/section.service";

export namespace SectionController {
	export const create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { title, duration, order, courseId } = req.body;
			const section = await SectionService.create({
				title,
				duration,
				order,
				courseId,
			});
			return res.status(201).json({
				message: "Section created successfully",
				section,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const sectionId = req.params.id;
			const section = await SectionService.findById(sectionId);
			return res.status(200).json({ course: section });
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updateById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			const data = req.body;
			if (!id || !data) {
				throw new Error("Please provide section id in req parameters, and data in req body");
			}
			const section = await SectionService.updateById(id, data);
			return res.status(201).json({
				message: "Section updated successfully",
				section,
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				throw new Error("Please provide section id in req parameters");
			}
			const section = await SectionService.deleteById(id);
			return res.status(204).json({ message: "Section deleted successfully" });
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
