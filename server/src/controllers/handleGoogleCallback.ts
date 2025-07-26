import { Request, Response, NextFunction } from "express";
import passport from "passport";
import "../auth/passport";
import { User } from "../types/user";
import { generateToken } from "../auth/jwt";
import sendCookie from "../utils/sendCookie";

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
        });

      const { user, newUser } = userPayload as {
        user: User;
        newUser: boolean;
      };
      const token = generateToken(user.id);

      sendCookie(res, token);

      res.status(newUser ? 201 : 200).json({
        success: true,
        message: newUser ? "Account created" : "Login successful",
        data: {
          newUser,
          user,
        },
      });
    }
  )(req, res, next);
}
