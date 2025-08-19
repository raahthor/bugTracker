import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function assignBug(req: AuthRequest, res: Response) {
  const { bugId, userId } = req.body;
  const { id } = req.userData as JWTDecoded;

  try {
    const isMember = await prisma.bugs.findFirst({
      where: {
        id: bugId,
        project: { organization: { members: { some: { userId: id } } } },
      },
      select: { id: true, status: true },
    });
    if (!isMember)
      return res.status(403).json({
        success: false,
        message: "Access Denied",
        data: null,
      });
    if (isMember.status === "CLOSED")
      return res.status(400).json({
        success: false,
        message: "Closed bugs can't be assigned",
        data: null,
      });
    const assignedUser = await prisma.bugs.update({
      where: { id: bugId },
      data: {
        assignedTo: userId,
        status: "IN_PROGRESS",
      },
    });
    res.status(201).json({
      success: true,
      message: "Bug assigned successfully",
      data: { assignedUser },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
