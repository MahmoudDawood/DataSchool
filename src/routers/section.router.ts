import { Router } from "express";
import { SectionController } from "../controllers/section.controller";
import authenticate from "../middlewares/authenticate";

const sectionRouter = Router();

sectionRouter.post("/", authenticate, SectionController.create); // Create a section in course
sectionRouter.get("/", authenticate, SectionController.findAll); // Get all sections (private)
sectionRouter.get("/:id", SectionController.findById); // Get section info
sectionRouter.put("/:id", authenticate, SectionController.updateById); // Update section
sectionRouter.delete("/:id", authenticate, SectionController.deleteById); // Delete section

export { sectionRouter };
