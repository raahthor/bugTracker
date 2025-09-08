import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function deleteProject(req: AuthRequest, res: Response) {
  const { id } = req.userData as JWTDecoded;
  const { projId } = req.params;
  try {
    const project = await prisma.projects.findFirst({
      where: { id: projId, organization: { ownerId: id } },
    });
    if (!project)
      return res.status(404).json({
        success: false,
        message: "Project not found or Unauthorized",
        data: null,
      });

    const bugs = await prisma.bugs.deleteMany({ where: { projectId: projId } });
    const delProj = await prisma.projects.delete({ where: { id: projId } });
    
    res.status(200).json({
      success: true,
      message: "Project delted",
      data: { bugsDeleted: bugs.count, delProj },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
