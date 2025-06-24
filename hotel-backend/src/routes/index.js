import express from "express";
import authRoutes from "./auth.js";
import userRoutes from "./users.js";
import roomRoutes from "./rooms.js";
import bookingRoutes from "./bookings.js";
import contactRoutes from "./contact.js";
import galleryRoutes from "./gallery.js";
import offerRoutes from "./offers.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/rooms", roomRoutes);
router.use("/bookings", bookingRoutes);
router.use("/contact", contactRoutes);
router.use("/gallery", galleryRoutes);
router.use("/offers", offerRoutes);

export default router;
