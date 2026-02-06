import cors from "cors";
import { Request, Response, NextFunction } from "express";


export const corsConfig = (req: Request, res: Response, next: NextFunction) => {

  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

 
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
};