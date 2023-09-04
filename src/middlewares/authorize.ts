import { NextFunction, Request, Response } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	try {
		const role = req.role;
		if (role == "admin") {
			next();
		}
		return res.status(403).send("Unauthorized Access");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const authorize = (req: Request, res: Response, next: NextFunction) => {
	try {
		const paramId = req.params.id ? req.params.id : req.params.userId;
		const id = req.tokenId;
		if (id == paramId || req.role == "admin") {
			next();
		}
		return res.status(403).send("Unauthorized Access");
	} catch (error: any) {
		throw new Error(error);
	}
};
