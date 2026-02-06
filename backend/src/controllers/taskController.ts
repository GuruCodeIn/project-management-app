import { Request, Response, NextFunction } from "express";
import Task from "../models/Task";

// ================= CREATE TASK =================
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, projectId } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({
        message: "Title and ProjectId are required",
      });
    }

    const task = await Task.create({
      title,
      projectId,
      completed: false,
    });

    return res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};


export const getTasksByProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });

    return res.json(tasks || []);
  } catch (error) {
    next(error);
  }
};


export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.json(task);
  } catch (error) {
    next(error);
  }
};

// ================= DELETE TASK =================
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.json({
      message: "Task deleted",
      id: req.params.id,
    });
  } catch (error) {
    next(error);
  }
};

// ================= MARK COMPLETED =================
export const markCompleted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    
    return res.json({
      _id: task._id,
      title: task.title,
      projectId: task.projectId,
      completed: task.completed,
    });
  } catch (error) {
    next(error);
  }
};
