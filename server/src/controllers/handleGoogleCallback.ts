import { Request, Response, NextFunction } from "express";
import passport from "passport";
import "../auth/passport";
import { User } from "../types/user";
import { generateToken } from "../auth/jwt";
import sendCookie from "../utils/sendCookie";
import { env } from "../utils/env";

const clientUrl = env.CLIENT_URL;

export default function handleGoogleCallback(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "google",
    { session: false },

    (err: Error | null, userPayload: unknown, info?: unknown) => {
      if (err || !userPayload)
        return res.status(400).json({
          success: false,
          message: "Authorization failed :" + err?.message,
          data: null,
        });

      const user = userPayload as User;
      const token = generateToken(user.id, user.email);

      const cookieDomain = "devbugs.vercel.app";

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: env.NODE_ENV === "production" ? "none" : "lax",
        secure: env.NODE_ENV === "production",
        domain: cookieDomain,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      if (user.username !== null)
        res.redirect(`${clientUrl}/u/${user.username}`);
      else res.redirect(`${clientUrl}/u/new`);
    }
  )(req, res, next);
}
