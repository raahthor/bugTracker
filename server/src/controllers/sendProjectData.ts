import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function sendProjectData(req: AuthRequest, res: Response) {
  const { handle, slug } = req.params;
  const { id, email } = req.userData as JWTDecoded;
  try {
    const isOrg = await prisma.organizations.findUnique({
      where: { handle },
      include: { projects: { where: { slug }, include: { bugs: true } } },
    });
    if (!isOrg)
      return res.status(400).json({
        success: false,
        message: "Organization not found",
        data: null,
      });

    const isMember = await prisma.organizationUsers.findUnique({
      where: {
        userId_orgId: {
          userId: id,
          orgId: isOrg.id,
        },
      },
    });
    if (!isMember)
      return res.status(403).json({
        success: false,
        message: "Your not a member here",
        data: null,
      });

    if (isOrg.projects.length === 0)
      return res.status(400).json({
        success: false,
        message: "Project not found",
        data: null,
      });

    res.status(200).json({
      success: true,
      message: "Project data sent",
      data: {
        projectData: isOrg.projects[0],
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
