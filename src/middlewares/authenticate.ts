import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
dotenv.config();

export default function (req: Request, res: Response, next: NextFunction) {
	try {
		const authorizationHeader = req.headers.authorization;
		const token = authorizationHeader?.split(" ")[1];
		if (!token) {
			return res.status(401).send("Access Denied / Unauthorized request");
		}
		const payload = jwt.verify(
			token as string,
			process.env.TOKEN_SECRET as string
		) as JwtPayload;
		req.tokenId = payload.id;
		req.role = payload.role;
		next();
	} catch (error: any) {
		res.status(401);
		res.json("Access denied, Invalid token: " + error);
		next(new Error(error));
	}
}
