import { Router } from "express";
import { TopicController } from "../controllers/topic.controller";
const topicRouter = Router();

topicRouter.post("/", TopicController.create); // Create topic
topicRouter.get("/", TopicController.findAll); // Create all existing topics
topicRouter.delete("/:id"); // Delete topic

export { topicRouter };
