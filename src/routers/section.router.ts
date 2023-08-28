import { Router } from "express";
import { SectionController } from "../controllers/section.controller";

const sectionRouter = Router();

sectionRouter.post("/", SectionController.create); // Create a section in course
sectionRouter.get("/", SectionController.findAll); // Get all sections (private)
sectionRouter.get("/:id", SectionController.findById); // Get section info
sectionRouter.put("/:id", SectionController.updateById); // Update section
sectionRouter.delete("/:id", SectionController.deleteById); // Delete section

export { sectionRouter };
