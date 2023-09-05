import express, { Express } from "express";
import asyncHandler from "express-async-handler";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler";
import {
	commentRouter,
	completedLessonRouter,
	courseRouter,
	enrollmentRouter,
	lessonRouter,
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

// TODO: Use cors
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/users", asyncHandler(userRouter));
app.use("/courses", asyncHandler(courseRouter));
app.use("/enroll", asyncHandler(enrollmentRouter));
app.use("/lessons", asyncHandler(lessonRouter));
app.use("/sections", asyncHandler(sectionRouter));
app.use("/complete", asyncHandler(completedLessonRouter));
app.use("/reviews", asyncHandler(reviewRouter));
app.use("/topics", asyncHandler(topicRouter));
app.use("/posts", asyncHandler(postRouter));
app.use("/comments", asyncHandler(commentRouter));
app.use("/likes", asyncHandler(likeRouter));

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
