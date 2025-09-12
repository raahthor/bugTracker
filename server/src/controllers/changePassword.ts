import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";
import { hashPassword, verifyPassword } from "../utils/hashPassword";

export default async function changePassword(
  req: AuthRequest<{ oldPass: string; newPass: string }>,
  res: Response
) {
  const { id } = req.userData as JWTDecoded;
  const { oldPass, newPass } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: { id },
    });
    const isPassword = await verifyPassword(user?.password!, oldPass);
    if (!isPassword)
      return res.status(403).json({
        success: false,
        message: "Incorrect password",
        data: null,
      });
    const hash = await hashPassword(newPass);
    await prisma.users.update({ where: { id }, data: { password: hash } });
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
