import jwt from "jsonwebtoken";
import { env } from "./env";
export default async function resetToken(id: string) {
  const token = jwt.sign({ id }, env.JWT_BREVO_SECRET!, {
    expiresIn: "30m",
  });
  return token;
}
