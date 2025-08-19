import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function closeBug(req: AuthRequest, res: Response) {
  const { id } = req.userData as JWTDecoded;
  const { bugId } = req.body;
  try {
    const isMember = await prisma.bugs.findFirst({
      where: {
        id: bugId,
        project: { organization: { members: { some: { userId: id } } } },
      },
      select: {
        id: true,
        assignedTo: true,
        project: { select: { organization: { select: { ownerId: true } } } },
      },
    });
    if (!isMember)
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
        data: null,
      });

    if (
      id !== isMember.assignedTo &&
      id !== isMember.project.organization.ownerId
    )
      return res.status(403).json({
        success: false,
        message: "Only 'Assignee' or 'Owner' can close it!",
        data: null,
      });
      
    await prisma.bugs.update({
      where: { id: bugId },
      data: { status: "CLOSED" },
    });
    res.status(200).json({
      success: true,
      message: "Bug closed",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
