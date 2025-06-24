import express from "express";
import { createOffer, getOffers, deleteOffer } from "../controllers/offerController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getOffers);
router.post("/", auth, createOffer);
router.delete("/:id", auth, deleteOffer);

export default router;
