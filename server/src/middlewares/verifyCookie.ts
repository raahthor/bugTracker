import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JWTDecoded, AuthRequest } from "../types/authRequest";

export const verifyCookie = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token as string;
  if (!token)
    return res.status(403).json({
      success: false,
      message: "Unauthorized, try again!",
      data: null,
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTDecoded;
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid token",
      data: null,
    });
  }
};
