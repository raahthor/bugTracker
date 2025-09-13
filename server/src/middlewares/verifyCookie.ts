import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JWTDecoded, AuthRequest } from "../types/authRequest";
import { env } from "../utils/env";

export const verifyCookie = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token as string;
  console.log(req.cookies);
  console.log(req.originalUrl);
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized, try again!",
      data: null,
    });
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET!) as JWTDecoded;
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      data: null,
    });
  }
};
