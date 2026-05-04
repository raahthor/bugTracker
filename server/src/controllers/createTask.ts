import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function createBug(
  req: AuthRequest<{
    name: string;
    description: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
  }>,
  res: Response
) {
  const { handle, slug } = req.params;
  const { id, email } = req.userData as JWTDecoded;
  const { name, description, priority } = req.body;

  try {
    const isOrg = await prisma.organizations.findUnique({
      where: { handle, deletedAt: null },
      include: {
        members: { where: { userId: id }, select: { role: true, id: true } },
        projects: { where: { slug } },
      },
    });
    if (!isOrg)
      return res.status(400).json({
        success: false,
        message: "Organization not found",
        data: null,
      });
    if (isOrg.members.length === 0)
      return res.status(400).json({
        success: false,
        message: "You're not a member",
        data: null,
      });
    if (isOrg.projects.length === 0)
      return res.status(400).json({
        success: false,
        message: "Project not found",
        data: null,
      });

    const createdBug = await prisma.bugs.create({
      data: {
        name,
        description,
        priority,
        raisedByUser: { connect: { id } }, // or raisedBy : id
        project: { connect: { id: isOrg.projects[0].id } },
      },
    });
    res.status(201).json({
      success: true,
      message: "Bug created",
      data: createdBug,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
