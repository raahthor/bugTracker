import jwt from "jsonwebtoken";
// import { User } from "../types/user";

export const generateToken = (id: string): string => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
