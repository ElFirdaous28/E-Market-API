import express from "express";
import { register, login } from "../controllers/authController.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Example of protected route
router.get("/profile", isAuthenticated, isAdmin, (req, res) => {
    res.json({ message: `Welcome, user ${req.user.id}`, user: req.user });
});

export default router;