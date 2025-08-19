import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function sendProjectData(req: AuthRequest, res: Response) {
  const { handle, slug } = req.params;
  const { id, email } = req.userData as JWTDecoded;
  try {
    const isOrg = await prisma.organizations.findFirst({
      where: {
        handle,
        members: { some: { userId: id } },
      },
      include: {
        projects: {
          where: { slug },
          include: {
            bugs: {
              include: {
                assignedUser: {
                  select: { name: true, avatar: true, username: true },
                },
                raisedByUser: {
                  select: { name: true, avatar: true, username: true },
                },
              },
              orderBy: { updatedAt: "desc" },
            },
          },
        },
      },
    });
    if (!isOrg)
      return res.status(404).json({
        success: false,
        message: "Organization not found",
        data: null,
      });
    if (isOrg.projects.length === 0)
      return res.status(404).json({
        success: false,
        message: "Project not found",
        data: null,
      });
    const members = await prisma.organizationUsers.findMany({
      where: { orgId: isOrg.id },
      select: {
        user: {
          select: { id: true, name: true, username: true, avatar: true },
        },
      },
    });
    const bugs = isOrg.projects[0].bugs;

    res.status(200).json({
      success: true,
      message: "Project data sent",
      data: {
        projectData: isOrg.projects[0],
        bugs: bugs,
        members,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      data: null,
    });
  }
}
