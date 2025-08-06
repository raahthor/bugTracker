import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/auth.types";
import prisma from "../utils/client";

export default async function sendDashData(req: AuthRequest, res: Response) {
  const { id, email } = req.userData as JWTDecoded;
  try {
    //   fetch dashboard data here
    // const recentOrgs=prisma // fetch recent orgs here
    res.status(200).json({
      success: true,
      message: "Data sent",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
