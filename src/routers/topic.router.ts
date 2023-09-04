import { Router } from "express";
import { TopicController } from "../controllers/topic.controller";
import authenticate from "../middlewares/authenticate";
import { authorize, isAdmin } from "../middlewares/authorize";
const topicRouter = Router();

topicRouter.use(authenticate, isAdmin);
topicRouter.post("/", TopicController.create); // Create topic
topicRouter.get("/", TopicController.findAll); // Create all existing topics
topicRouter.delete("/:id", TopicController.deleteById); // Delete topic

export { topicRouter };
