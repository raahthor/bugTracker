import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function joinOrganization(
  req: AuthRequest<{ orgId: string; joinCode: string }>,
  res: Response
) {
  const { orgId, joinCode } = req.body;
  const { id } = req.userData as JWTDecoded;

  try {
    const org = await prisma.organizations.findUnique({
      where: { id: orgId },
      select: { handle: true, joinCode: true },
    });
    if (joinCode !== org?.joinCode)
      return res.status(400).json({
        success: false,
        message: "Incorrect Join Code",
        data: null,
      });

    await prisma.organizationUsers.upsert({
      where: { userId_orgId: { userId: id, orgId } },
      update: { isActive: true },
      create: {
        role: "MEMBER",
        isActive: true,
        user: { connect: { id } },
        organization: { connect: { id: orgId } },
      },
    });

    res.status(201).json({
      success: true,
      message: "Organization Joined successfully",
      data: { handle: org?.handle },
    });
  } catch (err) {
    // console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
