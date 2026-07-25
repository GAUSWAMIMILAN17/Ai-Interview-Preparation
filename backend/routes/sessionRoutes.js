import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  createSession,
  getMySessions,
  getSessionById,
  deleteSession,
} from "../controllers/sessionController.js";

const router = express.Router();

router.post("/create", protect, createSession);

// Static route first
router.get("/my-sessions", protect, getMySessions);

// Dynamic routes after
router.get("/:id", protect, getSessionById);
router.delete("/:id", protect, deleteSession);

export default router;