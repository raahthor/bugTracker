import jwt from "jsonwebtoken";
import { env } from "../utils/env";

export interface JWTPayload {
  id: string;
  email: string;
  name?: string | null;
  username?: string | null;
  avatar?: string | null;
}

export function generateToken(
  payloadOrId: JWTPayload | string,
  emailOrUndefined?: string
): string {
  const payload =
    typeof payloadOrId === "string"
      ? { id: payloadOrId, email: emailOrUndefined! }
      : payloadOrId;

  return jwt.sign(payload, env.JWT_SECRET!, {
    expiresIn: "7d",
  });
}
