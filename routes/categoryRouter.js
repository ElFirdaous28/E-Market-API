import express from "express";
import * as CategoryController from "../controllers/CategoryController.js";
import validate from "../middlewares/validate.js";
import { categorySchema } from "../validations/categorySchema.js";

const router = express.Router();

router.post("/", validate(categorySchema), CategoryController.createCategory);
router.get("/", CategoryController.getCategories);
router.get("/deleted", CategoryController.getDeletedCategories);

router.patch("/:id", validate(categorySchema), CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);
router.get("/:id", CategoryController.getCategoryById);

router.delete("/:id/soft", CategoryController.softDeleteCategory);
router.patch("/:id/restore", CategoryController.restoreCategory);

export default router;