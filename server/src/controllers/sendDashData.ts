import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";
import { OrgUsers } from "../types/orgUsers";

export default async function sendDashData(req: AuthRequest, res: Response) {
  const { id, email } = req.userData as JWTDecoded;
  try {
    //   fetch dashboard data here
    const recentOrgs = await prisma.organizationUsers.findMany({
      where: { userId: id },
      orderBy: { updatedAt: "desc" },
      take: 3,
      include: {
        organization: true,
      },
    });
    res.status(200).json({
      success: true,
      message: "Data sent",
      data: { recentOrgs },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}