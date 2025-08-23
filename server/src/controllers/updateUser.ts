import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function updateUser(req: AuthRequest, res: Response) {
  const { id } = req.userData as JWTDecoded;
  const { name, username } = req.body;

  if (!name && !username) return res.status(400);
  try {
    let user;
    if (name) {
      user = await prisma.users.update({
        where: { id },
        data: { name: name },
      });
    }
    if (username) {
      const existedUsername = await prisma.users.findUnique({
        where: { username },
      });
      if (existedUsername)
        return res.status(409).json({
          success: false,
          message: "Username already in use",
          data: null,
        });
      if (username.length < 4)
        return res.status(400).json({
          success: false,
          message: "Short username",
          data: null,
        });
      user = await prisma.users.update({
        where: { id },
        data: { username: username },
      });
    }
    res.status(201).json({
      success: true,
      message: "User updated",
      data: { username: user?.username },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
