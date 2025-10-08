import express from "express";
import * as userController from "../controllers/UserController.js";
import validate from "../middlewares/validate.js";
import { userSchema } from "../validations/userSchema.js";

const router = express.Router();

router.post("/", validate(userSchema), userController.createUser);
router.patch("/:id", validate(userSchema), userController.updateUser);
router.delete("/:id",userController.deleteUser);

export default router;