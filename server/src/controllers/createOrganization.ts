import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import { customAlphabet } from "nanoid";
import prisma from "../utils/client";

function createJoinCode() {
  const chars = "QWERTYUPASDFGHJKLZXCVBNM23456789";
  return customAlphabet(chars, 8)();
}

export default async function createOrganization(
  req: AuthRequest,
  res: Response
) {
  const { name, handle } = req.body;
  const { id, email } = req.userData as JWTDecoded;

  try {
    const joinCode = createJoinCode();

    const existedHandle = await prisma.organizations.findUnique({
      where: { handle },
    });
    if (existedHandle)
      return res.status(409).json({
        success: false,
        message: "Handle already in use",
        data: null,
      });

    const createdOrg = await prisma.organizations.create({
      data: {
        name,
        handle,
        joinCode,
        owner: { connect: { id } },
      },
    });
    res.status(201).json({
      success: true,
      message: "Organization created successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
