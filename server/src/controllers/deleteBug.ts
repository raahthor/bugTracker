import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function deleteBug(req: AuthRequest, res: Response) {
  const { id } = req.userData as JWTDecoded;
  const { bugId } = req.params;
  try {
    const isMember = await prisma.bugs.findFirst({
      where: {
        id: bugId,
        project: { organization: { members: { some: { userId: id } } } },
      },
      select: { id: true },
    });
    if (!isMember)
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
        data: null,
      });
    await prisma.bugs.delete({ where: { id: bugId } });
    res.status(200).json({
      success: true,
      message: "Bug deleted",
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
