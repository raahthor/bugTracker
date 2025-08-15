import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";

export default async function joinOrganization(
  req: AuthRequest,
  res: Response
) {
  const { orgId, joinCode } = req.body;
  const { id } = req.userData as JWTDecoded;
  try {
    // add members to organization after verifying joinCode
    res.status(200).json({
      success: true,
      message: "Organization Joined successfully",
      data: null,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
