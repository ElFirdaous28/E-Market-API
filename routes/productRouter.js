import express from "express";
import * as productController from "../controllers/ProductController.js";
import validate from "../middlewares/validate.js";
import { productSchema } from "../validations/productSchema.js";

const router = express.Router();

router.post("/", validate(productSchema), productController.createProduct);
router.patch("/:id", validate(productSchema), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

export default router;