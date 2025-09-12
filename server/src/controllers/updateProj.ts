import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function updateProj(
  req: AuthRequest<{ name: string; description: string; id: string }>,
  res: Response
) {
  const { id } = req.userData as JWTDecoded;
  const { name, description, id: projId } = req.body;

  if (!name && !description)
    return res.status(409).json({
      success: false,
      message: "No input",
      data: null,
    });
  try {
    let project;
    if (name)
      project = await prisma.projects.update({
        where: { id: projId, organization: { ownerId: id } },
        data: { name },
      });
    else if (description)
      project = await prisma.projects.update({
        where: { id: projId, organization: { ownerId: id } },
        data: { description },
      });
    if (!project)
      return res.status(403).json({
        success: false,
        message: "Not Authorized",
        data: null,
      });
    res.status(200).json({
      success: true,
      message: "Project updated",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
