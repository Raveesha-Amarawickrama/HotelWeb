import express from "express";
import { getAllUsers, getProfile } from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAllUsers);
router.get("/profile", auth, getProfile);

export default router;
