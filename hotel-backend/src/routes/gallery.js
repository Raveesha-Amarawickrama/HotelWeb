import express from "express";
import { uploadImage, getGalleryImages, deleteImage } from "../controllers/galleryController.js";
import upload from "../middleware/upload.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, upload.single("image"), uploadImage);
router.get("/", getGalleryImages);
router.delete("/:id", auth, deleteImage);

export default router;
