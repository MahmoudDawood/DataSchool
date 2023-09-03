import { Router } from "express";
import { TopicController } from "../controllers/topic.controller";
import authenticate from "../middlewares/authenticate";
const topicRouter = Router();

topicRouter.use(authenticate);
topicRouter.post("/", TopicController.create); // Create topic
topicRouter.get("/", TopicController.findAll); // Create all existing topics
topicRouter.delete("/:id", TopicController.deleteById); // Delete topic

export { topicRouter };
