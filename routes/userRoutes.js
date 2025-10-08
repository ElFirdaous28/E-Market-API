import express from "express";
import * as userController from "../controllers/UserController.js";
import validate from "../middlewares/validate.js";
import { userSchema } from "../validations/userValidation.js";

const router = express.Router();

router.post("/", validate(userSchema), userController.createUser);

export default router;