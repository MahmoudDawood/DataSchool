import { Router } from "express";
import { SectionController } from "../controllers/section.controller";
import authenticate from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorize";
const sectionRouter = Router();

sectionRouter.post("/", authenticate, isAdmin, SectionController.create); // Create a section in course
sectionRouter.get("/:id", SectionController.findById); // Get section
sectionRouter.get("/", authenticate, isAdmin, SectionController.findAll); // Get all sections
sectionRouter.put("/:id", authenticate, isAdmin, SectionController.updateById); // Update section
sectionRouter.delete("/:id", authenticate, isAdmin, SectionController.deleteById); // Delete section

export { sectionRouter };
