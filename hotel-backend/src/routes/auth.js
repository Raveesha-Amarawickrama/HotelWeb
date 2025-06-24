import express from "express";
import { register, login } from "../controllers/authController.js";
import { validateFields } from "../middleware/validation.js";

const router = express.Router();

router.post("/register", validateFields(["name", "email", "password"]), register);
router.post("/login", validateFields(["email", "password"]), login);

export default router;
