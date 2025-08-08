import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function sendOrgData(req: AuthRequest, res: Response) {
  const { handle } = req.params;
  const { id, email } = req.userData as JWTDecoded;
  try {
    const org = await prisma.organizations.findUnique({
      where: { handle },
    });
    res.status(200).json({
      success: true,
      message: "OK",
      data: handle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
