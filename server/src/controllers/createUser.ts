import { Request, Response } from "express";
import * as argon2 from "argon2";
import prisma from "../utils/client";
import { AuthRequest, JWTDecoded } from "../types/auth.types";
interface UserInput {
  name: string;
  username: string;
  password: string;
}

const hashPassword = async (password: string): Promise<string> => {
  const hash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 13,
    timeCost: 2,
    parallelism: 1,
  });
  return hash;
};

// after successful creation redirect user to frontend/u/username instead of sending data here

export default async function createUser(req: AuthRequest, res: Response) {
  const { name, username, password } = req.body as UserInput;
  const { id, email } = req.userData as JWTDecoded;
  try {
    if (username === "null")
      return res.status(400).json({
        success: false,
        message: "username can't be 'null'!",
        data: null,
      });

    const existedUser = await prisma.users.findUnique({
      where: { id },
    });
    if (existedUser?.username !== null)
      return res.status(403).json({
        success: false,
        message: "Account already exists!",
        data: null,
      });

    const existedUsername = await prisma.users.findUnique({
      where: { username },
    });
    if (existedUsername)
      return res.status(202).json({
        success: false,
        message: "username already in use",
        data: null,
      });

    const hashedPass = await hashPassword(password);
    const userData = await prisma.users.update({
      where: { id },
      data: { name, username, password: hashedPass },
    });

    res.status(201).json({
      success: true,
      message: "Profile completed",
      data: {
        userData,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      data: null,
    });
  }
}
