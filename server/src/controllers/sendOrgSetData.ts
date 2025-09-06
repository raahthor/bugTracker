import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function sendOrgSetData(req: AuthRequest, res: Response) {
  const { id } = req.userData as JWTDecoded;
  const { handle } = req.params;
  try {
    const org = await prisma.organizations.findUnique({
      where: { handle, members: { some: { userId: id } }, deletedAt: null },
      include: {
        owner: { select: { name: true, username: true, avatar: true } },
      },
    });
    if (!org)
      return res.status(404).json({
        success: false,
        message: "Organization not found",
        data: null,
      });
    res.status(200).json({
      success: true,
      message: "Organization data sent",
      data: { org, isOwner: id === org.ownerId },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
