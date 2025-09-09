import jwt from "jsonwebtoken";
export default async function resetToken(id: string) {
  const token = jwt.sign({ id }, process.env.JWT_BREVO_SECRET!, {
    expiresIn: "30m",
  });
  return token;
}
