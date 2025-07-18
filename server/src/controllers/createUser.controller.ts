import { Request, Response } from "express";

interface UserInput {
  name: string;
  username: string;
  email: string;
  password: string;
}
export const createUser = async (
  req: Request<{}, {}, UserInput>,
  res: Response
) => {};
