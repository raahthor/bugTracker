import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function sendProjSetData(req: AuthRequest, res: Response) {
  const { handle, slug } = req.params;
  const { id, email } = req.userData as JWTDecoded;
  try {
    const projData = await prisma.organizations.findFirst({
      where: {
        handle,
        members: { some: { userId: id } },
        deletedAt: null,
      },
      select: {
        projects: { where: { slug } },
        owner: {
          select: { id: true, name: true, avatar: true, username: true },
        },
      },
    });
    if (!projData)
      return res.status(404).json({
        success: false,
        message: "Not found",
        data: null,
      });
    if (projData.projects.length === 0)
      return res.status(404).json({
        success: false,
        message: "Project not found",
        data: null,
      });
    res.status(200).json({
      success: true,
      message: "Data sent",
      data: {
        projData: projData.projects[0],
        isOwner: projData.owner.id === id,
        owner: projData.owner,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
