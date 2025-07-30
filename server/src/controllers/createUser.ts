import { Request, Response } from "express";
import * as argon2 from "argon2";
import prisma from "../utils/client";
interface UserInput {
  id: string;
  email: string;
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

export default async function createUser(
  req: Request<{}, {}, UserInput>,
  res: Response
) {
  const { id, email, name, username, password } = req.body as UserInput;
  try {
    const checkUsername = await prisma.users.findUnique({
      where: { username },
    });
    if (username === "null")
      return res.status(400).json({
        success: false,
        message: "username can't be 'null'!",
        data: null,
      });
    if (checkUsername)
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
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      data: null,
    });
  }
}
