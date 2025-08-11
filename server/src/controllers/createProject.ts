import { Response } from "express";
import { AuthRequest, JWTDecoded } from "../types/authRequest";
import { customAlphabet } from "nanoid";
import prisma from "../utils/client";

function generateSlug() {
  const chars = "qwertyupasdfghjklzxcvbnm23456789";
  const slug = customAlphabet(chars, 6)();
  return slug;
}

export default async function createProject(req: AuthRequest, res: Response) {
  const { id, email } = req.userData as JWTDecoded;
  const { name, description } = req.body;
  const { handle } = req.params;

  try {
    const isOrg = await prisma.organizations.findUnique({ where: { handle } });
    if (!isOrg)
      return res.status(400).json({
        success: false,
        message: "Organization not found",
        data: null,
      });
    const isMember = await prisma.organizationUsers.findUnique({
      where: {
        userId_orgId: {
          userId: id,
          orgId: isOrg.id,
        },
      },
    });
    if (!isMember)
      return res.status(403).json({
        success: false,
        message: "You're not a member",
        data: null,
      });
    const slug = generateSlug();
    const createdProject = await prisma.projects.create({
      data: {
        name,
        description,
        slug,
        organization: { connect: { id: isOrg.id } },
      },
    });
    res.status(201).json({
      success: true,
      message: "Project created",
      data: { slug: createdProject.slug },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
}
