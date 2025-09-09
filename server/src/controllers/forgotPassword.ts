import { Request, Response } from "express";
import prisma from "../utils/client";
import sendResetMail from "../utils/sendResetMail";
import resetToken from "../utils/resetToken";

export default async function (req: Request, res: Response) {
  const { username } = req.body;
  try {
    const user = await prisma.users.findUnique({ where: { username } });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    const token = await resetToken(user.id);
    const response = await sendResetMail(user.email, token);
    res.status(200).json({
      success: true,
      message: response.message,
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
