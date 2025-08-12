import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function sendOrgData(req: AuthRequest, res: Response) {
  const { handle } = req.params;
  const { id, email } = req.userData as JWTDecoded;
  try {
    const org = await prisma.organizations.findUnique({
      where: { handle },
      include: {
        projects: true,
        members: {
          select: {
            user: {
              select: { id: true, name: true, email: true, avatar: true },
            },
            role: true,
          },
        },
      },
    });
    if (!org)
      return res.status(400).json({
        success: false,
        message: "Organization not found",
        data: null,
      });

    // remove this query and check existance of user through .find funciton as we already got all members in org query
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
    // destructure more efficiently or just direcly send it
    const orgData = {
      id: org.id,
      name: org.name,
      handle: org.handle,
      description: org.description,
      joinCode: org.joinCode,
      ownerId: org.ownerId,
      createdAt: org.createdAt,
      updatedAt: org.updatedAt,
      projects: org.projects,
    };
    const members = org.members.map((mem) => ({
      role: mem.role,
      id: mem.user.id,
      avatar: mem.user.avatar,
      name: mem.user.name,
      email: mem.user.email,
    }));
    res.status(200).json({
      success: true,
      message: "OK",
      data: {
        membership: isMember,
        orgData,
        members,
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
