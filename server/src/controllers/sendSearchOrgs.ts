import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

type Org = {
  id: string;
  name: string;
  handle: string;
  owner: { name: string | null };
};
type U = {
  orgId: string;
  isActive: boolean;
};

export default async function (req: AuthRequest, res: Response) {
  const { title } = req.params;
  const { id } = req.userData as JWTDecoded;
  try {
    const userInOrgs = await prisma.organizationUsers.findMany({
      where: { userId: id },
      select: { orgId: true, isActive: true },
    });
    const orgList = await prisma.organizations.findMany({
      where: {
        OR: [
          { name: { startsWith: title, mode: "insensitive" } },
          { handle: { startsWith: title, mode: "insensitive" } },
        ],
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        handle: true,
        owner: { select: { name: true } },
      },
    });
    const searchList = orgList.map((org: Org) => ({
      id: org.id,
      name: org.name,
      handle: org.handle,
      owner: org.owner.name,
      isMember: userInOrgs.some((u: U) => u.orgId === org.id && u.isActive),
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
