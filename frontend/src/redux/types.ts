// Project Types
export const GET_PROJECTS = "GET_PROJECTS";
export const ADD_PROJECT = "ADD_PROJECT";

// Task Types
export const GET_TASKS = "GET_TASKS";
export const ADD_TASK = "ADD_TASK";
export const COMPLETE_TASK = "COMPLETE_TASK";

// Interfaces
export interface Project {
  _id: string;
  name: string;
  description?: string;
}

export interface Task {
  _id: string;
  title: string;
  projectId: string;
  completed: boolean;
}
