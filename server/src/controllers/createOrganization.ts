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
    if (handle.length < 6)
      return res.status(400).json({
        success: false,
        message: "handle is short",
      });
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
        owner: { connect: { id } }, // or = ownerId:id,
      },
    });
    const membership = await prisma.organizationUsers.create({
      data: {
        role: "OWNER",
        organization: { connect: { id: createdOrg.id } }, // or = orgId: createdOrg.id,
        user: { connect: { id } }, // or = userId: id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Organization created successfully",
      data: { createdOrg },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
