import { Request, Response } from "express";
import { env } from "../utils/env";

export default async function handleLogin(req: Request, res: Response) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });
  res.status(200).json({
    success: true,
    message: "logged out",
    data: null,
  });
}
