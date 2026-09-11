import { Request, Response } from "express";
import prisma from "../utils/client";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import { hashPassword } from "../utils/hashPassword";
import { generateToken } from "../auth/jwt";
import sendCookie from "../utils/sendCookie";
interface UserInput {
  name: string;
  username: string;
  password: string;
}

export default async function createUser(req: AuthRequest, res: Response) {
  const { name, username, password } = req.body as UserInput;
  const { id, email } = req.userData as JWTDecoded;
  try {
    if (username.length < 4 || username.includes(" "))
      return res.status(400).json({
        success: false,
        message: "Short/Invalid username",
        data: null,
      });

    const [existedUser, existedUsername, hashedPass] = await Promise.all([
      prisma.users.findUnique({ where: { id } }),
      prisma.users.findUnique({ where: { username } }),
      hashPassword(password),
    ]);

    if (!existedUser || existedUser.username !== null)
      return res.status(403).json({
        success: false,
        message: "Your account already exists!",
        data: null,
      });

    if (existedUsername)
      return res.status(409).json({
        success: false,
        message: "username already in use",
        data: null,
      });

    const userData = await prisma.users.update({
      where: { id },
      data: { name, username, password: hashedPass },
    });

    const token = generateToken({
      id: userData.id,
      email: userData.email,
      name: userData.name,
      username: userData.username,
      avatar: userData.avatar,
    });
    sendCookie(res, token);

    res.status(201).json({
      success: true,
      message: "Profile completed",
      data: {
        username: userData.username,
      },
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      data: null,
    });
  }
}
