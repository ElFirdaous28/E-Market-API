import express from "express";
import * as userController from "../controllers/UserController.js";
import validate from "../middlewares/validate.js";
import { userSchema } from "../validations/userSchema.js";

const router = express.Router();

router.post("/", validate(userSchema), userController.createUser);
router.get("/", userController.getUsers);
router.get("/deleted", userController.getDeletedUsers);

router.get("/:id", userController.getUserById);
router.patch("/:id", validate(userSchema), userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.delete("/:id/soft", userController.softDeleteUser);
router.patch("/:id/restore", userController.restoreUser);

export default router;