import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";

export default function createProject(req: AuthRequest, res: Response) {
  const { id, email } = req.userData as JWTDecoded;
}
