import express from "express";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  markCompleted,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/complete", markCompleted);

export default router;
