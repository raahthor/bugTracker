import { Request, Response } from "express";

export default async function handleLogin(req: Request, res: Response) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    path: "/",
  });
  res.status(200).json({
    success: true,
    message: "logged out",
    data:null
  });
}
