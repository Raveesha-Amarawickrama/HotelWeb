import express from "express";
import {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getRooms);
router.get("/:id", getRoomById);
router.post("/", auth, createRoom);
router.put("/:id", auth, updateRoom);
router.delete("/:id", auth, deleteRoom);

export default router;
