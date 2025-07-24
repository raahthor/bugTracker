import { Request, Response } from "express";

interface UserInput {
  username: string;
  password: string;
}

export const handleLogin = async (
  req: Request<{}, {}, UserInput>,
  res: Response
) => {
  const { username, password } = req.body;
};
