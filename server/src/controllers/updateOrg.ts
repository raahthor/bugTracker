import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function updateOrg(
  req: AuthRequest<{
    name: string;
    description: string;
    handle: string;
    newHandle: string;
  }>,
  res: Response
) {
  const { id } = req.userData as JWTDecoded;
  const { name, newHandle, description, handle } = req.body;

  if (!name && !newHandle && !description)
    return res.status(400).json({
      success: false,
      message: "Fields are empty",
      data: null,
    });
  try {
    const org = await prisma.organizations.findUnique({
      where: {
        handle,
        ownerId: id,
      },
    });
    if (!org)
      return res.status(403).json({
        success: false,
        message: "You're not authorized",
        data: null,
      });

    if (name) {
      await prisma.organizations.update({
        where: { handle },
        data: { name: name },
      });
    } else if (newHandle) {
      const exixtedHandle = await prisma.organizations.findUnique({
        where: { handle: newHandle },
      });
      if (exixtedHandle)
        return res.status(409).json({
          success: false,
          message: "Handle already in use",
          data: null,
        });

      await prisma.organizations.update({
        where: { handle },
        data: { handle: newHandle },
      });
    } else if (description) {
      await prisma.organizations.update({
        where: { handle },
        data: { description: description },
      });
    }
    res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: newHandle || null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
