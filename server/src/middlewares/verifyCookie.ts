import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyCookie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token as string;
  if (!token)
    return res.status(400).json({
      success: false,
      message: "Unauthorized, try logging-in again!",
      data: null,
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // req.userId=decoded.id;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid token",
      data: null,
    });
  }
};
