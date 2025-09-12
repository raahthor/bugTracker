import jwt from "jsonwebtoken";
import { env } from "../utils/env";

export const generateToken = (id: string, email: string): string => {
  return jwt.sign({ id: id, email: email }, env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
