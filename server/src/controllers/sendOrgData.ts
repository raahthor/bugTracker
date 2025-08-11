import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function sendOrgData(req: AuthRequest, res: Response) {
  const { handle } = req.params;
  const { id, email } = req.userData as JWTDecoded;
  try {
    const org = await prisma.organizations.findUnique({
      where: { handle },
      include: { projects: true },
    });
    if (!org)
      return res.status(400).json({
        success: false,
        message: "Organization not found",
        data: null,
      });
    const isMember = await prisma.organizationUsers.findUnique({
      where: {
        userId_orgId: {
          userId: id,
          orgId: org.id,
        },
      },
    });
    if (!isMember)
      return res.status(400).json({
        success: false,
        message: "You're not a member",
        data: null,
      });
    //   send projects here too
    res.status(200).json({
      success: true,
      message: "OK",
      data: {
        membership: isMember,
        orgData: org,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
