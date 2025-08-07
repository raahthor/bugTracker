import { Request, Response, NextFunction } from "express";
import passport from "passport";
import "../auth/passport";
import { User } from "../types/user";
import { generateToken } from "../auth/jwt";
import sendCookie from "../utils/sendCookie";

const clientUrl = process.env.FRONTEND_URL;

export default function handleGoogleCallback(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "google",
    { session: false },

    (err, userPayload, info) => {
      if (err || !userPayload)
        return res.status(400).json({
          success: false,
          message: "Authorization failed :" + err.message,
          data: null,
        });

      const user = userPayload as User;
      const token = generateToken(user.id, user.email);

      sendCookie(res, token);
      if (user.username !== null)
        res.redirect(`${clientUrl}/u/${user.username}`);
      else res.redirect(`${clientUrl}/u/new`);
    }
  )(req, res, next);
}
