import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import prisma from "../utils/client";

export default async function deleteOrg(req: AuthRequest, res: Response) {
  const { id } = req.userData as JWTDecoded;
  const { orgId } = req.params;

  try {
    const deletedOrg = await prisma.organizations.update({
      where: {
        id: orgId,
        ownerId: id,
      },
      data: {
        // add a deleted at col in org table and handle fetched org accordingly
      },
    });
    if (!deletedOrg)
      return res.json(403).json({
        success: false,
        message: "You are not authorized",
        data: null,
      });
    res.status(200).json({
      success: true,
      message: "Organization deleted",
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
