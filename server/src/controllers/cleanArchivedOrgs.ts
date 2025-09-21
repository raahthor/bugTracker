import { Request, Response } from "express";
import prisma from "../utils/client";

async function runCleanUp() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);

  return prisma.$transaction(async (tx) => {
    const bugsDeleted = await tx.bugs.deleteMany({
      where: { deletedAt: { not: null, lt: cutoff } },
    });

    const projectsDeleted = await tx.projects.deleteMany({
      where: { deletedAt: { not: null, lt: cutoff } },
    });

    const orgsDeleted = await tx.organizations.deleteMany({
      where: { deletedAt: { not: null, lt: cutoff } },
    });

    return {
      bugsDeleted: bugsDeleted.count,
      projectsDeleted: projectsDeleted.count,
      orgsDeleted: orgsDeleted.count,
    };
  });
}

export default async function cleanArchivedOrgs(req: Request, res: Response) {
  const { code } = req.params;

  try {
    if (code !== "delete321")
      return res.status(401).json({
        suceess: false,
        message: "You're not authorized",
        data: null,
      });

    const result = await runCleanUp();

    res.status(200).json({
      success: true,
      message: "Archived organizations deleted successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error cleaning organizations",
      data: null,
    });
  }
}
