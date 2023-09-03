import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
dotenv.config();

export default function (req: Request, res: Response, next: NextFunction): void {
	try {
		const authorizationHeader = req.headers.authorization;
		const token = authorizationHeader?.split(" ")[1];
		jwt.verify(token as string, process.env.TOKEN_SECRET as string);
		next();
	} catch (error: any) {
		res.status(401);
		res.json("Access denied, Invalid token: " + error);
		next(new Error(error));
	}
}
