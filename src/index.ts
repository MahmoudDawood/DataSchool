import express, { ErrorRequestHandler, Express, NextFunction, Request, Response } from "express";
import {
	commentRouter,
	courseRouter,
	enrollmentRouter,
	likeRouter,
	postRouter,
	reviewRouter,
	sectionRouter,
	topicRouter,
	userRouter,
} from "./routers";

require("dotenv").config();
const app: Express = express();

const port = process.env.PORT ?? 3000;

const requestMiddleware = (req: Request, res: Response, next: NextFunction) => {
	console.log(req.method, req.path, "- body: ", req.body);
	next();
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestMiddleware);

app.use("/user", userRouter);
app.use("course", courseRouter);
app.use("enroll", enrollmentRouter);
app.use("section", sectionRouter);
app.use("/review", reviewRouter);
app.use("topic", topicRouter);
app.use("/post", postRouter);
app.use("comment", commentRouter);
app.use("like", likeRouter);

app.get("/", (req, res) => {
	res.send("Hello world");
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	console.error("Uncaught exception:", err);
	res.status(500).send("Unexpected error occurred, please try again later.");
};

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
