import { Request, Response } from "express";

interface UserInput {
  name: string;
  username: string;
  email: string;
  password: string;
}
export default async function createUser(
  req: Request<{}, {}, UserInput>,
  res: Response
) {}
