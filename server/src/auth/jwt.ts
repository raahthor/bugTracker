import jwt from "jsonwebtoken";

export const generateToken = (id: string, email: string): string => {
  return jwt.sign({ id: id, email: email }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
