import { Request, Response } from "express";
import prisma from "../utils/client";
import * as argon2 from "argon2";
import sendCookie from "../utils/sendCookie";
import { generateToken } from "../auth/jwt";

interface UserInput {
  username: string;
  password: string;
}

export default async function handleLogin(
  req: Request<{}, {}, UserInput>,
  res: Response
) {
  const { username, password } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: { username },
    });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Incorrect username",
        data: null,
      });
    const isPassword = await argon2.verify(user.password!, password);

    if (!isPassword)
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password",
        data: null,
      });

    const token = generateToken(user.id, user.email);
    sendCookie(res, token);

    res.status(200).json({
      success: true,
      message: "logged-in",
      data: { userData: user },
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      data: null,
    });
  }
}
