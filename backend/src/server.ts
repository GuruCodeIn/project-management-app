

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middleware/errorHandler";



dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("👉 MIDDLEWARE HIT:", req.method, req.url);

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");

  if (req.method === "OPTIONS") {
    console.log("✅ OPTIONS PREFLIGHT HANDLED");

    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept"
    });

    return res.end();
  }

  next();
});

app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

app.listen(5005, () => {
  console.log("🚀 SERVER RUNNING ON 5005");
});
