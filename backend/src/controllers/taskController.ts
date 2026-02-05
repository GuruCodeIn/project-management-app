import { Request, Response, NextFunction } from "express";
import Task from "../models/Task";

// Create Task
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, projectId } = req.body;

    if (!title || !projectId) {
      return res
        .status(400)
        .json({ message: "Title and ProjectId are required" });
    }

    const task = await Task.create({ title, projectId });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Get Tasks by Project
export const getTasksByProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// Update Task
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Delete Task
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};

// Mark Completed
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

    res.json(task);
  } catch (error) {
    next(error);
  }
};
