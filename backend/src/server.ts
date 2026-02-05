import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

// Connect Database
connectDB();

const app = express();

// ===== MIDDLEWARE =====

// CORS – allow all for assessment
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// 👉 IMPORTANT: Parse both formats
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ---- DEBUG LOGGER ----
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("👉 HIT:", req.method, req.url);
  console.log("👉 BODY:", req.body);
  next();
});

// ===== ROUTES =====
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route Not Found" });
});

// Centralized Error Middleware
app.use(errorHandler);

// ===== SERVER START =====
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
