import { Router, Request, Response, NextFunction } from "express";

const dataRouter = Router();
dataRouter.get("/api/user-data", (req: Request, res: Response) => {
  const token = req.cookies.token;
});
