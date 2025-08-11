import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import { customAlphabet } from "nanoid";

function generateSlug() {
  const chars = "qwertyupasdfghjklzxcvbnm23456789";
  const slug = customAlphabet(chars, 6)();
  return slug;
}

export default function createProject(req: AuthRequest, res: Response) {
  const { id, email } = req.userData as JWTDecoded;
  const { handle } = req.params;
  const { name, description } = req.body;
  const slug = generateSlug();
  console.log(handle);
  res.status(201).json({
    success: true,
    message: "Project created",
    data: { slug },
  });
}
