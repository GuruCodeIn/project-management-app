import { Router } from "express";
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
  markCompleted,
} from "../controllers/taskController";

const router = Router();

router.post("/", createTask);
router.get("/:projectId", getTasksByProject);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

// mark task as completed
router.patch("/:id/complete", markCompleted);

export default router;
