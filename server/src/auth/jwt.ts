import jwt from "jsonwebtoken";
import { User } from "../types/user";

export const generateToken = (user: User): string => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
