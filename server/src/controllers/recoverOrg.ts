import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma, { TransactionClient } from "../utils/client";

async function updateDeletedAt(orgId: string, ownerId: string) {
  return prisma.$transaction(async (tx: TransactionClient) => {
    const org = await tx.organizations.findUnique({
      where: { id: orgId, ownerId },
    });
    if (!org) throw new Error("NOTFOUND");

    await tx.organizations.update({
      where: { id: orgId },
      data: { deletedAt: null },
    });

    const projects = await tx.projects.updateMany({
      where: { orgId: org.id, deletedAt: { not: null } },
      data: { deletedAt: null },
    });

    const bugs = await tx.bugs.updateMany({
      where: { project: { orgId: org.id }, deletedAt: { not: null } },
      data: { deletedAt: null },
    });

    return {
      message: "Organization recoverd",
      projectsCount: projects.count,
      bugsCount: bugs.count,
    };
  });
}

export default async function recoverOrg(
  req: AuthRequest<{ orgId: string }>,
  res: Response
) {
  const { id } = req.userData as JWTDecoded;
  const { orgId } = req.body;
  // console.log(orgId);
  try {
    const result = await updateDeletedAt(orgId, id);

    res.status(200).json({
      success: true,
      message: "Organization recovered successfully",
      data: { projRec: result.projectsCount, bugRec: result.bugsCount },
    });
  } catch (err: any) {
    if (err.message === "NOTFOUND")
      res.status(403).json({
        success: false,
        message: "Organization not found or Unauthorized",
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
