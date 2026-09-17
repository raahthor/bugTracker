import { Request, Response } from "express";
import prisma from "../utils/client";
import { Prisma } from "@prisma/client";

async function runCleanUp() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);

  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    // Find organizations archived for more than 30 days
    const organizations = await tx.organizations.findMany({
      where: {
        deletedAt: {
          not: null,
          lt: cutoff,
        },
      },
      select: {
        id: true,
      },
    });

    const orgIds = organizations.map((org) => org.id);

    // Nothing to clean up
    if (orgIds.length === 0) {
      return {
        bugsDeleted: 0,
        projectsDeleted: 0,
        orgUsersDeleted: 0,
        orgsDeleted: 0,
      };
    }

    // Find all projects belonging to these organizations
    const projects = await tx.projects.findMany({
      where: {
        orgId: {
          in: orgIds,
        },
      },
      select: {
        id: true,
      },
    });

    const projectIds = projects.map((project) => project.id);

    // Delete all bugs belonging to those projects
    const bugsDeleted = await tx.bugs.deleteMany({
      where: {
        projectId: {
          in: projectIds,
        },
      },
    });

    // Delete all projects belonging to those organizations
    const projectsDeleted = await tx.projects.deleteMany({
      where: {
        orgId: {
          in: orgIds,
        },
      },
    });

    // Delete organization memberships
    const orgUsersDeleted = await tx.organizationUsers.deleteMany({
      where: {
        orgId: {
          in: orgIds,
        },
      },
    });

    // Finally delete the organizations
    const orgsDeleted = await tx.organizations.deleteMany({
      where: {
        id: {
          in: orgIds,
        },
      },
    });

    return {
      bugsDeleted: bugsDeleted.count,
      projectsDeleted: projectsDeleted.count,
      orgUsersDeleted: orgUsersDeleted.count,
      orgsDeleted: orgsDeleted.count,
    };
  });
}

export default async function cleanArchivedOrgs(req: Request, res: Response) {
  const { code } = req.params;

  try {
    if (code !== "delete321") {
      return res.status(401).json({
        success: false,
        message: "You're not authorized",
        data: null,
      });
    }

    const result = await runCleanUp();

    return res.status(200).json({
      success: true,
      message: "Archived organizations deleted successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Error cleaning organizations",
      data: null,
    });
  }
}
