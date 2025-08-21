import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function sendIssues(req: AuthRequest, res: Response) {
  const { id } = req.userData as JWTDecoded;
  try {
    const bugs = await prisma.bugs.findMany({
      where: { assignedTo: id, status: { not: "CLOSED" } },
      orderBy: { updatedAt: "desc" },
      include: {
        project: {
          select: {
            name: true,
            slug: true,
            organization: { select: { handle: true } },
          },
        },
        raisedByUser: { select: { name: true, avatar: true, username: true } },
      },
    });
    res.status(200).json({
      success: true,
      message: "Bug data sent",
      data: { bugs },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
