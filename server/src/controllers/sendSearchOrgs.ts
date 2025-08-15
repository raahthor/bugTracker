import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function (req: AuthRequest, res: Response) {
  const { title } = req.params;
  const { id } = req.userData as JWTDecoded;
  try {
    const userInOrgs = await prisma.organizationUsers.findMany({
      where: { userId: id },
      select: { orgId: true },
    });
    const orgList = await prisma.organizations.findMany({
      where: {
        OR: [
          { name: { contains: title, mode: "insensitive" } },
          { handle: { contains: title, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        handle: true,
        owner: { select: { name: true } },
      },
    });
    const searchList = orgList.map((org) => ({
      id: org.id,
      name: org.name,
      handle: org.handle,
      owner: org.owner.name,
      isMember: userInOrgs.some((u) => u.orgId === org.id),
    }));
    res.status(200).json({
      success: true,
      message: "Organizations list sent",
      data: { searchList },
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
