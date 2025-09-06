import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function sendSoftDeletedOrgs(
  req: AuthRequest,
  res: Response
) {
  const { id } = req.userData as JWTDecoded;
  try {
    const deletedOrgs = await prisma.organizations.findMany({
      where: { ownerId: id, deletedAt: { not: null } },
    });
    res.status(200).json({
      success: true,
      message: "Deleted Organizations",
      data: { deletedOrgs },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
