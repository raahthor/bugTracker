import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { hashPassword } from "../utils/hashPassword";
import prisma from "../utils/client";

function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_BREVO_SECRET!) as {
      id: string;
    };
    return { isValid: true, userId: decoded.id };
  } catch (err) {
    // console.log(err);
    return { isValid: false, message: "Token expired" };
  }
}

export default async function resetPassword(req: Request, res: Response) {
  const { newPass, token } = req.body;

  if (!token)
    return res.status(403).json({
      success: false,
      message: "token not found",
      data: null,
    });
  if (newPass.length < 6)
    return res.status(403).json({
      success: false,
      message: "password shorter",
      data: null,
    });

  try {
    const response = verifyToken(token);
    if (!response.isValid)
      return res.status(400).json({
        success: false,
        message: response.message,
        data: null,
      });

    const hashedPass = await hashPassword(newPass);

    await prisma.users.update({
      where: { id: response.userId },
      data: { password: hashedPass },
    });

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
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
