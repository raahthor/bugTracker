import { Request, Response } from "express";

interface UserInput {
  username: string;
  password: string;
}

export default async function handleLogin(
  req: Request<{}, {}, UserInput>,
  res: Response
) {
  const { username, password } = req.body;
}
