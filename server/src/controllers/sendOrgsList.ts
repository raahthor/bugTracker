import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function sendOrgsList(req: AuthRequest, res: Response) {
  const { id, email } = req.userData as JWTDecoded;
  try {
    const orgList = await prisma.organizationUsers.findMany({
      where: { userId: id, isActive: true, organization: { deletedAt: null } },
      orderBy: { createdAt: "desc" },
      include: {
        organization: {
          select: { name: true, handle: true, description: true },
        },
      },
    });
    res.status(200).json({
      success: true,
      message: "Organizations list sent",
      data: { orgList },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
