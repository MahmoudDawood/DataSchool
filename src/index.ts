import express, { Express } from "express";
import morgan from "morgan";
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
import { errorHandler } from "./utils/errorHandler";

require("dotenv").config();
const app: Express = express();

const port = process.env.PORT ?? 3000;

// TODO: Use cors
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/courses", courseRouter);
app.use("/enroll", enrollmentRouter);
app.use("/lessons", lessonRouter);
app.use("/sections", sectionRouter);
app.use("/complete", completedLessonRouter);
app.use("/reviews", reviewRouter);
app.use("/topics", topicRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/likes", likeRouter);

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
