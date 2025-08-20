import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function sendDashData(req: AuthRequest, res: Response) {
  const { id, email } = req.userData as JWTDecoded;
  try {
    const [recentOrgs, recentBugs] = await Promise.all([
      prisma.organizations.findMany({
        where: { members: { some: { userId: id } } },
        orderBy: { updatedAt: "desc" },
        take: 3,
        select: { id: true, description: true, name: true, handle: true },
      }),
      prisma.bugs.findMany({
        where: { assignedTo: id, status: { not: "CLOSED" } },
        orderBy: { updatedAt: "desc" },
        take: 3,
        include: {
          project: {
            select: {
              name: true,
              slug: true,
              organization: { select: { handle: true } },
            },
          },
        },
      }),
    ]);
    res.status(200).json({
      success: true,
      message: "Data sent",
      data: { recentOrgs, recentBugs },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
