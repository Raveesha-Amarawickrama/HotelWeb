import express from "express";
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
} from "../controllers/bookingController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createBooking);
router.get("/mine", auth, getMyBookings);
router.get("/", auth, getAllBookings);
router.put("/cancel/:id", auth, cancelBooking);

export default router;
