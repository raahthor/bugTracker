import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function removeUser(req: AuthRequest, res: Response) {
  const { id } = req.userData as JWTDecoded;
  const { removeUserId, orgId } = req.body;
  try {
    const org = await prisma.organizations.findUnique({
      where: { id: orgId, ownerId: id },
    });
    if (!org)
      return res.status(403).json({
        success: false,
        message: "Org not found",
        data: null,
      });
    if (org.ownerId === removeUserId)
      return res.status(403).json({
        success: false,
        message: "Can't remove owner",
        data: null,
      });
    await prisma.organizationUsers.update({
      where: { userId_orgId: { userId: removeUserId, orgId } },
      data: { isActive: false },
    });
    res.status(200).json({
      success: true,
      message: "User removed",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
