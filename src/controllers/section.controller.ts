import { NextFunction, Request, Response } from "express";
import { SectionService } from "../services/section.service";

export namespace SectionController {
	export const create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = req.body;
			const section = await SectionService.create(data);
			return res.status(201).json({
				message: "Section created successfully",
				data: section,
			});
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const findAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const sections = await SectionService.findAll();
			return res.status(200).json({ data: sections });
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const findById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide Section id"));
			}
			const section = await SectionService.findById(id);
			return res.status(200).json({ data: section });
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const updateById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			const data = req.body;
			if (!id || !data) {
				return next(new Error("Please provide section id and data"));
			}
			const section = await SectionService.updateById(id, data);
			return res.status(201).json({
				message: "Section updated successfully",
				data: section,
			});
		} catch (error: any) {
			next(new Error(error));
		}
	};

	export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return next(new Error("Please provide section id"));
			}
			await SectionService.deleteById(id);
			return res.status(204).json({ message: "Section deleted successfully" });
		} catch (error: any) {
			next(new Error(error));
		}
	};
}
