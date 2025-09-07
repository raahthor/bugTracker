import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

async function updateDeletedAt(orgId: string, ownerId: string) {
  return prisma.$transaction(async (tx) => {
    const org = await tx.organizations.update({
      where: { ownerId, id: orgId },
      data: { deletedAt: null },
    });
    if (!org) throw new Error("NOTFOUND");
    const projects = await tx.projects.updateMany({
      where: { orgId: org.id },
      data: { deletedAt: null },
    });
    const bugs = await tx.bugs.updateMany({
      where: { project: { orgId: org.id } },
      data: { deletedAt: null },
    });
    return {
      message: "Organization recoverd",
      projectsCount: projects.count,
      bugsCount: bugs.count,
    };
  });
}

export default async function recoverOrg(req: AuthRequest, res: Response) {
  const { id } = req.userData as JWTDecoded;
  const { orgId } = req.body;
  console.log(orgId);
  try {
    const result = await updateDeletedAt(orgId, id);

    res.status(200).json({
      success: true,
      message: "Organization recovered successfully",
      data: { projRec: result.projectsCount, bugRec: result.bugsCount },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
