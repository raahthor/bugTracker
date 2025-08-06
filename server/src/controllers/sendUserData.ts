import { Request, Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";
import { User } from "../types/user";

export default async function sendUserData(req: AuthRequest, res: Response) {
  const { id, email } = req.userData as JWTDecoded;
  try {
    const user = (await prisma.users.findUnique({
      where: { id },
    })) as User;
    res.status(200).json({
      success: true,
      message: "User Found",
      data: { userData: user },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      data: null,
    });
  }
}
