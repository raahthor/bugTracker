import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma, { TransactionClient } from "../utils/client";

async function softDelete(orgId: string, ownerId: string) {
  const now = new Date();

  return prisma.$transaction(async (tx: TransactionClient) => {
    const isOrg = await tx.organizations.findUnique({
      where: { id: orgId },
      select: { ownerId: true },
    });
    if (!isOrg || isOrg.ownerId !== ownerId) throw new Error("Unauthorized");

    await tx.organizations.update({
      where: { id: orgId },
      data: { deletedAt: now },
    });
    const projects = await tx.projects.updateMany({
      where: { orgId },
      data: { deletedAt: now },
    });

    const bugs = await tx.bugs.updateMany({
      where: { project: { orgId } },
      data: { deletedAt: now },
    });

    return {
      message: "Organization soft deleted successfully",
      projectsDeleted: projects.count,
      bugsDeleted: bugs.count,
    };
  });
}

export default async function softDeleteOrg(req: AuthRequest, res: Response) {
  const { id } = req.userData as JWTDecoded;
  const { orgId } = req.params;

  try {
    const result = await softDelete(orgId!, id);
    res.status(200).json({
      success: true,
      message: result.message,
      data: { projects: result.projectsDeleted, bugs: result.bugsDeleted },
    });
  } catch (err: any) {
    if (err.message === "Unauthorized")
      res.status(403).json({
        success: false,
        message: "You're not authorized",
        data: null,
      });
    else
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        data: null,
      });
  }
}
