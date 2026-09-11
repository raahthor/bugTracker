import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";
import { User } from "../types/user";

export default async function sendUserData(req: AuthRequest, res: Response) {
  const { id, email, name, username, avatar } = req.userData as JWTDecoded;
  try {
    // If the JWT payload already contains profile data, return it immediately without hitting the DB
    if (username && name) {
      return res.status(200).json({
        success: true,
        message: "User Found",
        data: {
          userData: {
            id,
            name,
            email,
            username,
            avatar: avatar || undefined,
          },
        },
      });
    }

    // Fallback to database lookup if token is missing profile information
    const user = (await prisma.users.findUnique({
      where: { id },
      select: { name: true, email: true, username: true, avatar: true },
    })) as User;

    res.status(200).json({
      success: true,
      message: "User Found",
      data: { userData: user },
    });
  } catch (err) {
    // console.error(err);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      data: null,
    });
  }
}
