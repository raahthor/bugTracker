import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

type Bug = {
  raisedBy: string;
  assignedTo: string | null;
  id: string;
  status: "CLOSED" | "OPEN" | "IN_PROGRESS";
};

export default async function sendIssues(req: AuthRequest, res: Response) {
  const { id } = req.userData as JWTDecoded;
  try {
    const bugs = await prisma.bugs.findMany({
      where: {
        deletedAt: null,
        project: {
          organization: {
            members: { some: { userId: id, isActive: true } },
          },
        },
        OR: [{ assignedTo: id, status: { not: "CLOSED" } }, { raisedBy: id }],
      },
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

    const raisedBugs = bugs.filter((bug: Bug) => bug.raisedBy === id);
    const assignedBugs = bugs.filter(
      (bug: Bug) => bug.assignedTo === id && bug.status !== "CLOSED"
    );

    res.status(200).json({
      success: true,
      message: "Bug data sent",
      data: { raisedBugs, assignedBugs },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
